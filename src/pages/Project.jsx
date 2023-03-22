import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import Select from "react-select";
import Banner from "../partials/Banner";
import axios from "axios";

const Project = () => {
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  //const [techUsed, setTechUsed] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const skillOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    // Validate project name
    if (projectName.trim() === "") {
      setError("Please enter a project name");
      return;
    }

    // Validate project url
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w\.-]*)*\/?$/;
    if (!urlRegex.test(projectUrl)) {
      setError("Please enter a valid project URL");
      return;
    }

    // Validate tech used
    if (skillsRequired === "") {
      setError("Please select a technology used");
      return;
    }

    // Validate project description
    if (projectDescription.trim() === "") {
      setError("Please enter a project description");
      return;
    }
    console.log(email,projectName,projectDescription,projectUrl,skillsRequired)
    // If all validations passed, submit the form
    var skills=[]
    skillsRequired.forEach((ele)=>
    {
      skills.push(ele['label'])
    })

    var data={}
    data["Tech_stack"] = skills.toLocaleString()
    data["Email"]=email
    data["name"]=projectName
    data["description"]=projectDescription
    data["url"]=projectUrl
    data["type"] = "add";
    console.log(data)
    await axios
      .post("http://127.0.0.1:4000/projects", JSON.stringify(data))
      .then((response) => {
        console.log(response.data);
      });

    alert("Project added successfully!");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="h1">Projects</h2>
              </div>
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-300"
                        placeholder="you@yourcompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="project-name"
                      >
                        Project Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="project-name"
                        type="text"
                        className="form-input w-full text-gray-300"
                        placeholder="Your project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="project-url"
                      >
                        Project URL <span className="text-red-600"></span>
                      </label>
                      <input
                        id="project-url"
                        type="url"
                        className="form-input w-full text-gray-300"
                        placeholder="https://yourproject.com"
                        value={projectUrl}
                        onChange={(e) => setProjectUrl(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="tech-used"
                      >
                        Technology Used <span className="text-red-600"></span>
                      </label>
                      {/* <select
                        id="tech-used"
                        className="form-select w-full text-gray-300"
                        value={techUsed}
                        onChange={(e) => setTechUsed(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select a technology
                        </option>
                        <option value="react">React</option>
                        <option value="vue">Vue</option>
                        <option value="angular">Angular</option>
                      </select> */}
                      <Select
                        className="form-input w-full"
                        classNamePrefix="select"
                        options={skillOptions}
                        isMulti
                        value={skillsRequired}
                        onChange={(selected) => setSkillsRequired(selected)}
                        styles={{
                          menu: (provided) => ({
                            ...provided,
                            backgroundColor: "black",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected
                              ? "gray"
                              : "black",
                            color: state.isSelected ? "black" : "white",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="project-description"
                      >
                        Project Description{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="project-description"
                        className="form-textarea w-full text-gray-300"
                        rows="4"
                        placeholder="Describe your project"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mb-4">{error}</p>
                  )}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="btn mt-4 w-full sm:w-auto bg-purple-600 hover:bg-purple-700 btn-lg btn-block shadow-lg rounded-pill animate__animated animate__bounce"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="max-w-md mx-auto pt-12 md:pt-20">
                <p className="text-center text-gray-300 text-sm">
                  Want to see what we're all about?{" "}
                  <Link className="text-blue-500 hover:text-blue-400" to="/">
                    Learn more about us
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
          {/* <Banner /> */}
        </section>
      </main>
    </div>
  );
};

export default Project;
