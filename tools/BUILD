load("@io_bazel_rules_go//go:def.bzl", "go_binary")

licenses(["notice"])

# The gen_test_html.template is used by js_test rule.
# See defs.bzl for details.
exports_files(["LICENSE", "gen_test_html.template"])

# The JS tests runner.
# See defs.bzl for details.
go_binary(
    name = "webtest",
    testonly = 1,
    srcs = ["webtest.go"],
    visibility = ["//:__subpackages__"],
    deps = [
        "@com_github_tebeka_selenium//:go_default_library",
        "@io_bazel_rules_webtesting//go/webtest:go_default_library",
    ],
)

# A simple static file server. Handy for running tests manually or inspecting
# content from a browser.
# Execute "bazel run //tools:server" from command line
# and open http://localhost:8080 in a browser.
go_binary(
    name = "server",
    testonly = 1,
    srcs = ["server.go"],
    data = [
        "//demo:demo_files",
        "//demo:hello_bin",
        "//demo:hello_test",
        "//google-codelab:google_codelab_files",
        "//google-codelab-index:google_codelab_index_files",
        "//google-codelab-step:google_codelab_step_files",
        "//google-codelab-survey:google_codelab_survey_files",
        "@polyfill//:custom_elements",
        "@polyfill//:native_shim",
        "@prettify//:prettify",
    ],
)
