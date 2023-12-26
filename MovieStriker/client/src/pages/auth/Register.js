import React, { useState } from "react";
import Layout from "./../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // form submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // handle api request
      console.log(name, email, password);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password }
      );
      console.log(res);
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title="Register e-commerce app">
      <div className="register form-container">
        <h1>Register page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
