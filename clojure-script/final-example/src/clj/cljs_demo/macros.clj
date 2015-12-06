(ns cljs-demo.macros)

(defmacro $ [target]
  (let [sel (name target)]
    (condp = (-> sel seq first)
      \# `(.getElementById js/document ~(subs sel 1))
      \. `(.getElementsByClassName js/document ~(subs sel 1))
      `(if-let [k# (name ~target)]
         (condp = (-> k# seq first)
           \# (.getElementById js/document (subs k# 1))
           \. (.getElementsByClassName js/document (subs k# 1))))
      )))
