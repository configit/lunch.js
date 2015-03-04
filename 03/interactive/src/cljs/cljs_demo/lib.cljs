(ns cljs-demo.lib
  (:require-macros [cljs-demo.macros :refer [$]])
  (:require [goog.net.Jsonp]
            [goog.Uri]
            [cljs.core.async :as async :refer [chan put!]]
            [clojure.string :as cstr]))

(defn dom-atom
  "Creates DOM element from 'atomic' input. If input is a keyword,
  creates an element according to the name of the keyword. If the
  input is anything else, creates a text-node given input"
  [atom]
  (if (keyword? atom)
    (.createElement js/document (name atom))
    (.createTextNode js/document atom)))

(defn set-attr [node attr-name value]
  (cond (map? value) (doseq [[nname nvalue] value]
                       (aset (aget node attr-name)
                             (name nname) nvalue))
        (= "on-" (subs attr-name 0 3)) (let [evn (subs attr-name 3)]
                                         (.addEventListener node evn value))
        (= "class" attr-name) (aset node "className" value)
        :else (aset node attr-name value)))

(defn set-attrs [node attrMap]
  (doseq [[key-name value] attrMap]
    (set-attr node (name key-name) value)))

(defn get-tag-attr [keyword-elem]
  (let [splits (cstr/split (name keyword-elem) #"\.")
        classes (rest splits)
        cls-str (cstr/join " " classes)
        init-map (if (cstr/blank? cls-str)
                   {}
                   {:class cls-str})
        tag-id (cstr/split (first splits) #"#")]
    (if (= 2 (count tag-id))
      [(first tag-id) (assoc init-map :id (last tag-id))]
      [(first splits) init-map])))


(defn dom [spec]
  (if (sequential? spec)
    (when-let [head (first spec)]
      (cond
       (keyword? head) (let [[tag init-attr] (get-tag-attr head)
                             node (.createElement js/document tag)
                             attr (if (map? (-> spec rest first))
                                    (-> spec rest first))
                             tail (if attr
                                    (-> spec rest rest)
                                    (-> spec rest))]
                         (do
                           (if (or attr init-attr)
                             (set-attrs node (merge init-attr attr)))
                           (doseq [child-element (mapcat dom tail)]
                             (.appendChild node child-element))
                           [node]))
       :else (let [headElem (dom head)
                   tailElems (->> (rest spec)
                                  (map dom)
                                  (apply concat))]
               (if (sequential? headElem)
                 (concat headElem tailElems)
                 (cons headElem tailElems)))))
    [(dom-atom spec)]))


(defn jsonp
  ([uri] (jsonp (chan) uri))
  ([c uri]
    (try
     (let [gjsonp (goog.net.Jsonp. (goog.Uri. uri))]
       (.send gjsonp nil #(put! c %))
       c)
     (catch :default e e))))

(defn by-id [id]
  (.getElementById js/document id))

(defn replace-dom [id elements]
  (let [elem ($ id)]
    (if-let [oldChildren (aget elem "children")]
      (loop [oldChild (aget (aget elem "children") 0)]
        (if oldChild
          (do (.removeChild elem oldChild)
              (recur (aget (aget elem "children") 0))))))
    (doseq [child elements]
      (.appendChild elem child))))
