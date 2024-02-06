import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";

// Toastfy
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let id = sessionStorage.getItem('id');

let toUpdateArray = [];


function Todo() {

  const HOST = "http://localhost:9134";

  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);
  const [showBodyInput, setShowBodyInput] = useState(false);

  const flag = () => {
    setShowBodyInput(true);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title & Body Is Required!");
    }
    else {
      if (id) {
        await axios.post(`${HOST}/api/v2/addtask`,
          { title: inputs.title, body: inputs.body, id: id })
          .then((response) => {
            console.log(response);
          });

        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added !");
      }
      else {
        setArray([...array, inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added !");
        toast.warning("Your Task Is Not Save ! Please SignUp");
      }
      setShowBodyInput(false);
    }
  };

  const del = async (CardId) => {
    if (CardId) {
      await axios
        .delete(`${HOST}/api/v2/deleteTask/${CardId}`, { data: { id: id } })
        .then(() => {
          toast.success("Your Task Is Deleted !");
          setTimeout(() => {
            window.location.reload(false);
            
          }, 3000);
        })
    }
    else {
      toast.error("No task found !");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const toBeUpdate = (value) => {
    toUpdateArray = array[value];
  }

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios.get(`${HOST}/api/v2/getTasks/${id}`).then((response) => {
          setArray(response.data.tasks);
        });
      };
      fetch();
    }
  }, [submit]);


  return (
    <>
      <div className="todo w-100 ">
        <ToastContainer autoClose={2500} />
        <div className="todo-main container d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column todo-inputs">
            <input
              onClick={flag}
              onChange={change}
              name="title"
              type="text"
              value={inputs.title}
              placeholder="TITLE"
              className="my-2 border-0  "
            />
            <textarea
              onChange={change}
              name="body"
              style={{ display: showBodyInput ? "block" : "none" }}
              type="text"
              value={inputs.body}
              placeholder="BODY"  
              className="my-2 border-0  "
            />
          </div>
          <button id="add-btn" onClick={submit} className="btn btn-warning">
            Add
          </button>
        </div>
        <div className="todo-body">
          <div className="container-fluid mt-5 px-5">
            <div className="row">
              {array.map((item, index) => (
                <div key={index} className="col-lg-3 col-12 my-2">
                  <TodoCards title={item.title} body={item.body} id={item._id} delid={del} display={dis} updateId={index} toBeUpdate={toBeUpdate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="update-wrapper"><Update display={dis} update={toUpdateArray} /></div>
      </div>
    </>
  );
}

export default Todo;
