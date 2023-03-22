import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import Banner from "../partials/Banner";
const Contest = () => {
  const handleSearch = async (event) => {
    event.preventDefault();
    var data = {};
    data["type"] = "search";
    data["searchkey"] = document.getElementById("search").value;
    console.log(data)
    await axios
      .post("http://127.0.0.1:4000/projects", JSON.stringify(data))
      .then((response) => {
        var resp = response.data["server"];
        console.log(resp);
        setProjects(resp);
      });
  };
  const [Projects, setProjects] = useState([[{ Title: "No searches yet" }]]);
  const [Hackathons,setHackathons] = useState([])
  const [Announcements,setAnnouncements] = useState([])
  const handleHackathons = async (event)=>
  {
    event.preventDefault();
    var data={}
    data["type"]="Hackathon_details"
    await axios
      .post("http://127.0.0.1:4000/hackathon", JSON.stringify(data))
      .then((response) => { 
        console.log(response.data);
        setHackathons(response.data.res)
      });
  }
  const handleAnnouncements = async(event)=>
  {
    event.preventDefault();
    var data={}
    data["type"]="Announcement_details"
    await axios
      .post("http://127.0.0.1:4000/announcement", JSON.stringify(data))
      .then((response) => { 
        console.log(response.data);
        setAnnouncements(response.data.res)
      });
  }
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Explore the community!</h1>
              </div>
              <div className="relative flex flex-col lg:flex-row justify-between items-center">
                {/* CTA content */}
                <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
                  <h3 className="h3 text-white mb-2">Project surf🌊</h3>
                  <p className="text-purple-200 text-lg">
                    Find your member project details to network with and blend
                    with the community
                  </p>
                </div>

                <form className="w-full lg:w-1/2">
                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                    <input
                      type="text"
                      id="search"
                      className="w-full appearance-none bg-purple-700 border border-purple-500 focus:border-purple-300 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-purple-400"
                      placeholder="Enter project title or tech stack"
                      aria-label="Your best email…"
                      required
                    />
                    <button
                      type="submit"
                      className="btn text-purple-600 bg-purple-100 hover:bg-white shadow"
                      onClick={handleSearch}
                    >
                      Go
                    </button>
                  </div>
                </form>
              </div>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                <h3 className="h3 text-white mb-2">Results💡</h3>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Project title
                      </th>
                      <th scope="col" class="px-6 py-3">
                        URL
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Tech stack
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Creator email
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Projects != [[{ Title: "No searches yet" }]]
                      ? Projects[0].map((data) => (
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {data.Title}
                            </th>
                            <td class="px-6 py-4">{data.URL}</td>
                            <td class="px-6 py-4">{data.Tech_Stack}</td>
                            <td class="px-6 py-4">{data.Email}</td>
                            <td class="px-6 py-4">{data.Description}</td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>

              {/* Form */}
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-8 pb-12 md:pt-40 md:pb-20">
              <div className="relative flex flex-col lg:flex-row justify-between items-center">
                {/* CTA content */}
                <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
                  <h3 className="h3 text-white mb-2">Hackathon Hunt</h3>
                  <p className="text-purple-200 text-lg">
                    Team up with your fellow members and participate in inter/intra college hackathons and reign glory🥇
                  </p>
                </div>
                
                <form className="w-full lg:w-1/2">
                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                   
                    <button
                      type="submit"
                      className="btn text-purple-600 bg-purple-100 hover:bg-white shadow"
                      onClick={handleHackathons}
                    >
                      Search!
                    </button>
                  </div>
                </form>
              </div>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                      Team ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                      Current Size
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Max size
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Registration Link
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Skill set reqs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Hackathons != []
                      ? Hackathons.map((data) => (
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {data.Team_id}
                            </th>
                            <td class="px-6 py-4">{data.Curr_size}</td>
                            <td class="px-6 py-4">{data.Max_size}</td>
                            <td class="px-6 py-4">{data.Reg_link}</td>
                            <td class="px-6 py-4">{data.Skills_req}</td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>

              {/* Form */}
            </div>
          </div>
        </section>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-8 pb-12 md:pt-40 md:pb-20">
              <div className="relative flex flex-col lg:flex-row justify-between items-center">
                {/* CTA content */}
                <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
                  <h3 className="h3 text-white mb-2">Announcements</h3>
                  <p className="text-purple-200 text-lg">
                    Find the announcements made by the admins
                  </p>
                </div>
                
                <form className="w-full lg:w-1/2">
                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                   
                    <button
                      type="submit"
                      className="btn text-purple-600 bg-purple-100 hover:bg-white shadow"
                      onClick={handleAnnouncements}
                    >
                      Search!
                    </button>
                  </div>
                </form>
              </div>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                      Title
                      </th>
                      <th scope="col" class="px-6 py-3">
                      Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Description
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {Announcements != []
                      ? Announcements.map((data) => (
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {data.Subject}
                            </th>
                            <td class="px-6 py-4">{data.Date}</td>
                            <td class="px-6 py-4">{data.Content}</td>
                            
                            
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>

              {/* Form */}
            </div>
          </div>
        </section>
      </main>

      <Banner />
    </div>
  );
};

export default Contest;
