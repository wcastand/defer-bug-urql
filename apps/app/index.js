import "core-js/full/symbol/async-iterator"
import "react-native-gesture-handler"
import { polyfill as polyfillEncoding } from "react-native-polyfill-globals/src/encoding"
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch"
import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream"

polyfillReadableStream()
polyfillEncoding()
polyfillFetch()


import 'expo-router/entry'