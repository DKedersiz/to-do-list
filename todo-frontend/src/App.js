import "./App.css";
import TaskList from "./TaskList";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h2>To-Do List</h2>
        <TaskList />
      </div>
    </Provider>
  );
};

export default App;
