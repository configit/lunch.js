(ns cljs-demo.core
  (:use [cljs-demo.lib :only (dom replace-dom)]))

(def state-atom (atom {:quotes [{:id 1 :name "First Quote"  :status "New"}
                                 {:id 2 :name "Second Quote" :status "New"}
                                 {:id 3 :name "Third Quote"  :status "New"}
                                 {:id 4 :name "Forth Quote"  :status "New"}]
                      }))

(def history (atom nil))

(declare render)

(defn transact! [state-fn]
  (let [old-state @state-atom]
    (swap! history (fn [old-history] (cons @state-atom old-history)))
    (swap! state-atom state-fn)
    (render @state-atom)))

(defn undo! []
  (if-let [prev-state (first @history)]
    (do
      (swap! history (fn [old-hist] (rest old-hist)))
      (swap! state-atom (fn [_] prev-state))
      (render @state-atom))
    (.alert js/window "No history to undo")
  ))

(defn read-state [js-state]
  (transact! (fn [_] (js->clj js-state :keywordize-keys true))))

(defn snapshot []
  (let [js-state (clj->js @state-atom)
        state-str (.stringify js/JSON js-state)]
    (aset js/window.localStorage "snapshot" state-str)
  ))

(defn restore-snapshot []
  (when-let [snapshot-str (aget js/window.localStorage "snapshot")]
    (let [snapshot (.parse js/JSON snapshot-str)]
      (transact! (fn [_] (js->clj snapshot :keywordize-keys true))))))

(defn clear-snapshot []
  (.removeItem js/window.localStorage "snapshot"))

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

(defn quote [quote]
  [:li
   (:name quote) " — "
   [:small {:id (:id quote)}(:status quote)]
   (linkButton [:span (nextAction (:status quote))]
      (fn [_]
        (transact!
          (fn [state]
            (assoc state :quotes
              (replace
                {quote (assoc quote :status (nextStatus (:status quote)))}
                (:quotes state)))))
      )
   )])

(defn quote-list [quote-list]
  (if (empty? quote-list)
    [:div [:h2 {:style {:color "#c0c0c0" :text-align "center" }} "Nothing is here?"]]
    [:ul (map quote quote-list)]))

(defn close-quote [quote]
  (assoc quote :status "Closed"))

(defn close-all-quotes [state]
  (assoc state :quotes
    (map close-quote (:quotes state))))

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
     (linkButton "Close All"
        (fn [_] (transact! close-all-quotes)))
     ]))

(defn app-view [state]
  (dom [:div
        (summary (:quotes state))
        (quote-list (:quotes state))]))

(defn render [state]
  (replace-dom :#app-root (app-view state)))

(render @state-atom)
