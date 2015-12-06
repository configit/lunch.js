# ClojureScript

All examples use the leiningen build tool.

For each of the folders one may build the website by executing the following
command:

  lein cljsbuild once

This will download all required dependencies as specified in ``project.clj``
and compile the required files and bundle them into a js file (location also
specified in ``project.clj``).

Running the above command is a little slow because one have to wait for the jvm
to start. To avoid this delay, one can instead run:

  lein cljsbuild auto

This will start a process that watches source files (.cljs ones at least) and
recompile upon detecting a change. Must faster turnaround time.
