"use client";
import { GoBack, Search } from "@/helpers/icons";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`https://dummyjson.com/users`);
      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.company.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  return (
    <div className="userContainer">
      <div className="userHeader">
        <Link className="backBtn" href={"../"}>
          <GoBack />
        </Link>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search by company title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <Search />
          </button>
        </form>
      </div>
      <div className="userBoxContainer">
        {filteredUsers.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id}>
            <div className="userBox">
              <div className="userBoxHeader">
                <img src={user.image} alt="" />
                <p>
                  {user.firstName} {user.lastName}
                  <span>{user.company.title}</span>
                  <span className={user.gender === "male" ? "male" : "female"}>
                    {user.gender}
                  </span>
                </p>
              </div>
              <div className="userBoxFooter">
                <p className="location">
                  <img src="../img/location.svg" alt="" />{" "}
                  {user.company.address.city}
                </p>
                <p className="age">
                  <img src="../img/user-age.svg" alt="" />
                  {user.age} years
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
