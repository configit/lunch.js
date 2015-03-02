(ns cljs-demo.core
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs-demo.macros :refer [$]]
                   )
  (:require [clojure.string :as string]
            [cljs.core.async :as async :refer [chan <! >! put! timeout]])
  (:use [cljs-demo.lib :only (dom jsonp by-id)]))

(declare render-state)

(defn replace-dom [id elements]
  (let [elem ($ id)]
    (if-let [oldChildren (aget elem "children")]
      (loop [oldChild (aget (aget elem "children") 0)]
        (if oldChild
          (do (.removeChild elem oldChild)
              (recur (aget (aget elem "children") 0))))))
    (doseq [child elements]
      (.appendChild elem child))))

(defn insert-dom [elements]
  (replace-dom :#app-root elements))

(def ch (chan))

(def state-atom (atom
                 {:quotes [{:id 1 :name "First Quote"  :status "New"}
                           {:id 2 :name "Second Quote" :status "New"}
                           {:id 3 :name "Third Quote"  :status "New"}
                           {:id 4 :name "Forth Quote"  :status "New"}]}))

(defn trans-state [state-fun]
  (let [old-state @state-atom
        new-state (state-fun old-state)]
    (async/put! ch {:old-state old-state :new-state new-state})))

(defn undo-state []
  (async/put! ch :undo))

(def base-url
  "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=")

(defn rand-status []
  (rand-nth ["New" "Sent" "Closed"]))

(defn isX [x status] (= x status))

(def isNew    (partial isX "New"))
(def isSent   (partial isX "Sent"))
(def isClosed (partial isX "Closed"))

(defn get-status-summary [quotes]
  {:newCount (count (filter #(isNew (:status %)) quotes))
   :sentCount (count (filter #(isSent (:status %)) quotes))
   :closedCount (count (filter #(isClosed (:status %)) quotes))})

(defn nextStatus [status]
  (condp = status
    "New" "Sent"
    "Sent" "Closed"
    ""))

(defn nextAction [status]
  (condp = status
    "New" "Send"
    "Sent" "Close"
    ""))

(def link-button-style
  {:color "rgb(45, 107, 158)"
   :float "right"
   :cursor "pointer"
   :border "none"
   :background "none"})

(defn linkButton
  ([elem]
     [:button {:style link-button-style} elem])
  ([elem onclick]
     [:button {:style link-button-style
               :on-click onclick}
      elem]))

(defn trans-quote [quote state]
  (let [qs (:quotes state)]
      (assoc state :quotes
            (replace {quote (assoc quote :status (nextStatus (:status quote)))}
                     qs))))

(defn quote [quote]
  [:li
   (:name quote) " — "
   [:small (:status quote)]
   (linkButton [:span (nextAction (:status quote))]
               (fn [_] (trans-state (partial trans-quote quote))))])

(defn quote-list [quote-list]
  (if (empty? quote-list)
    [:div [:h2 {:style {:color "#c0c0c0" :text-align "center" }} "Nothing is here?"]]
    [:ul#the-quote-list.some-class (map quote quote-list)]))

(defn closeable [status]
  (or (= "New" status)
      (= "Sent" status)))

(defn close-all-quotes [quotes state]
  (let [quotes (:quotes state)]
    (assoc state
      :quotes
      (map (fn [q]
             (if (closeable (:status q))
               (assoc q :status "Closed")
               q))
           quotes))))

(defn summary [quotes]
  (let [status-summary (get-status-summary quotes)]
    [:div {:style {:border "1px solid #bbb"
                   :padding-top "20px"
                   :padding-bottom "20px"
                   :padding-left "12px"
                   :padding-right "12px"
                   :fontSize "12px"
                   :backgroundColor "#eee"}}
     (:newCount status-summary) " New Quotes, "
     (:sentCount status-summary) " Sent Quotes, and "
     (:closedCount status-summary) " Closed Quotes"
     (linkButton "Close All" (fn [_]
                               (trans-state
                                (partial close-all-quotes quotes))))]))

(defn query-wiki [n query]
  (let [out (chan)]
    (go
      (let [[_ names] (<! (jsonp (str base-url query)))]
        (>! out (take n names))))
    out))

(defn wiki-search []
  [:div
   [:input {:type "text" :id "my-inp"}]
   [:input {:style {:width "42px"} :type "number" :id "my-num"}]
   (linkButton
    [:small "Populate from Wikipedia"]
    (fn [_]
      (let [val (.-value ($ :#my-inp))
            n   (->> ($ :#my-num)
                     .-value
                     js/parseInt)]
        (go (let [names (<! (query-wiki n val))]
              (do
                (trans-state
                 (fn [old-state]
                   (assoc old-state :quotes [])))
                (<! (timeout 1000))
                (trans-state
                 (fn [old-state]
                   (assoc old-state :quotes
                          (map-indexed (fn [idx name] {:id idx
                                                       :name name
                                                       :status (rand-status)})
                                       names))))))))))])

(defn render-state [state]
  (dom [:div
        (linkButton
         [:small "Undo"]
         (fn [_] (undo-state)))
        (summary (:quotes state))
        (quote-list (:quotes state))
        (wiki-search)
        ]))


(defn refresh-page [state]
  (insert-dom (render-state state)))

(refresh-page @state-atom)

(go-loop [state-hist nil]
  (let [state-op (<! ch)]
    (cond
     (and (= :undo state-op)
          (<= 1 (count state-hist))) (let [prev-state (first state-hist)]
                                       (do
                                         (swap! state-atom (fn [_] prev-state))
                                         (refresh-page prev-state)
                                         (recur (rest state-hist))))
     (map? state-op) (let [new-state (:new-state state-op)
                           old-state (:old-state state-op)]
                       (swap! state-atom (fn [_] new-state))
                       (-> new-state
                           render-state
                           insert-dom)
                       (if (= new-state old-state)
                         (recur state-hist)
                         (recur (cons old-state state-hist))))
     :else (recur state-hist))))
