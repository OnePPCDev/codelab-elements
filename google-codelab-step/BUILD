package(default_visibility = ["//visibility:public"])

licenses(["notice"])

exports_files(["LICENSE"])

load("//tools:defs.bzl",
     "closure_js_library", "closure_js_binary", "closure_js_test")
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_template_library")
load("@io_bazel_rules_sass//sass:sass.bzl", "sass_binary", "sass_library")


filegroup(
    name = "google_codelab_step_files",
    srcs = glob([
        "*.html",
        "*.png",
    ]) + [
        ":google_codelab_step_scss_bin",
        ":google_codelab_step_bin",
    ],
)

# Codelab step.
closure_js_library(
    name = "google_codelab_step",
    srcs = ["google_codelab_step.js"],
    deps = [
        "@io_bazel_rules_closure//closure/library",
        ":google_codelab_step_soy",
    ],
)

# Compiled version of GoogleCodelabStep element, suitable for distribution.
closure_js_binary(
    name = "google_codelab_step_bin",
    entry_points = ["googlecodelabs.CodelabStep"],
    deps = [":google_codelab_step"],
)

sass_library(
    name = "syntax",
    srcs = ["_syntax.scss"],
)

sass_binary(
    name = "google_codelab_step_scss_bin",
    src = "google_codelab_step.scss",
    deps = [
        ":syntax",
    ]
)

closure_js_template_library(
    name = "google_codelab_step_soy",
    srcs = ["google_codelab_step.soy"]
)

closure_js_test(
    name = "google_codelab_step_test",
    srcs = ["google_codelab_step_test.js"],
    entry_points = ["googlecodelabs.CodelabStepTest"],
    deps = [":google_codelab_step"],
)
