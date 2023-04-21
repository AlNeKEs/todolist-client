import { all } from "redux-saga/effects";
import * as Todo from "../../page/home/store/saga"
export default function*() {
  yield all([Todo.todoList()]);
}
