"use client";

import { GoBack } from "@/helpers/icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetail({ params }) {
  const { id } = params;

  console.log("id :>> ", id);
  const [data, setData] = useState(null);
  const [todosData, setTodosData] = useState(null);

  useEffect(() => {
    const handlefetch = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        console.log(response);
        const todo = await fetch(`https://dummyjson.com/users/${id}/todos`);

        if (!response.ok) {
          return notFound();
        }

        const datas = await response.json();
        const todos = await todo.json();

        console.log("datas :>> ", datas);
        console.log("todos :>> ", todos);

        setData(datas);
        setTodosData(todos);
      } catch (e) {
        console.log(e);
        throw new Error("Sunucuda bir hata oluştu");
      }
    };

    handlefetch();
  }, [id]);

  if (!data || !todosData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="userDetail">
      <Link className="backBtn" href={"./"}>
        <GoBack />
      </Link>
      <div className="detailContainer">
        <div className="informationBox">
          <ul className="userCardBox">
            {data.gender === "Male" ? (
              <img src="../img/avatar-boy.svg" alt="" />
            ) : (
              <img src="../img/avatar-girl.svg" alt="" />
            )}
            <li>
              <b>
                {data.firstName} {data.lastName}
              </b>
            </li>
            <li>
              <span>{data.email}</span>
            </li>
            <li>
              {todosData.todos.map((todo) =>
                todo.completed === false ? (
                  <p key={todo.id} className="notCompleted">
                    {todo.todo}:<span>Not Completed</span>
                  </p>
                ) : (
                  <p key={todo.id}>
                    {todo.todo}:<span>Completed</span>
                  </p>
                )
              )}
            </li>
          </ul>

          <ul className="userCardBoxDetail">
            <li>
              <span>Gender</span>
              {data.gender.toUpperCase()}
            </li>
            <li>
              <span>Birthday</span>
              {data.birthDate}
            </li>
            <li>
              <span>Phone Number</span>
              {data.phone}
            </li>
            <li>
              <span>Address</span>
              {data.address.address} {data.address.state}
            </li>
            <li>
              <span>City</span>
              {data.address.city}
            </li>
            <li>
              <span>University</span>
              {data.university}
            </li>
            <li>
              <span>Company Name</span>
              {data.company.name}
            </li>
            <li>
              <span>Department</span>
              {data.company.department}
            </li>
            <li>
              <span>Role</span>
              {data.company.title}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
