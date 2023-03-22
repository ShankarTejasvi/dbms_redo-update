import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import Banner from "../partials/Banner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";

const Hackathon = () => {
  // const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [maxTeamSize, setMaxTeamSize] = useState("");
  const [currentTeamSize, setCurrentTeamSize] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [problemStatementDescription, setProblemStatementDescription] =
    useState("");
  const [hackathonDate, setHackathonDate] = useState(new Date());
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [error, setError] = useState("");

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
    // const emailRegex = /\S+@\S+\.\S+/;
    // if (!emailRegex.test(email)) {
    //   setError("Please enter a valid email");
    //   return;
    // }

    // Validate team name
    if (teamName.trim() === "") {
      setError("Please enter a team name");
      return;
    }

    // Validate max team size
    // const maxTeamSizeRegex = /^\d+$/;
    // if (!maxTeamSizeRegex.test(maxTeamSize)) {
    //   setError("Please enter a valid maximum team size");
    //   return;
    // }

    // // Validate current team size
    // const currentTeamSizeRegex = /^\d+$/;
    // if (!currentTeamSizeRegex.test(currentTeamSize)) {
    //   setError("Please enter a valid current team size");
    //   return;
    // }

    // Validate registration link
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w\.-]*)*\/?$/;
    if (!urlRegex.test(registrationLink)) {
      setError("Please enter a valid registration link");
      return;
    }

    // Validate venue
    // if (venue.trim() === "") {
    //   setError("Please enter a venue");
    //   return;
    // }

    // Validate problem statement description
    if (problemStatementDescription.trim() === "") {
      setError("Please enter a problem statement description");
      return;
    }

    // Validate hackathon date
    if (hackathonDate === null) {
      setError("Please select a hackathon date");
      return;
    }

    // Validate skills required
    if (skillsRequired.length === 0) {
      setError("Please select at least one skill required");
      return;
    }
    console.log([teamName,maxTeamSize,currentTeamSize,registrationLink,problemStatementDescription,hackathonDate,skillsRequired])
    
    var skills=[]
    skillsRequired.forEach((ele)=>
    {
      skills.push(ele['label'])
    })
    // console.log(skills)
    
    // If all validations passed, submit the form
    var data={}
    data['Team_id'] = teamName
    data['Curr_size'] = currentTeamSize
    data['Max_size'] = maxTeamSize
    data['url'] = registrationLink
    data["desc"] = problemStatementDescription
    data['Date'] = Parsedate(hackathonDate)
    data['Skills_req'] = skills.toLocaleString()

    console.log(data) //axios request pending
    await axios
      .post("http://127.0.0.1:4000/hackathon", JSON.stringify(data))
      .then((response) => { 
        console.log(response.data);
      });
      
      alert("Hackathon details uploaded!");
      navigate("/")
  };
  function Parsedate(date)
  {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    var ans = day + "-" + month + "-" + year;
    console.log(ans.toString())
    return ans.toString();
  }
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

        <form onSubmit={handleSubmit}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {" "}
            {/*"max-w-6xl mx-auto px-4 sm:px-6">*/}
            <div className="pt-32 pb-8">
              <div className="lg:w-3/4 xl:w-2/3">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h2 className="h1">Hackathons</h2>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-100 text-sm font-bold mb-1"
                    htmlFor="project-name"
                  >
                    Team Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    className="form-input w-full text-gray-300"
                    placeholder="Your project name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-100 text-sm font-bold mb-1"
                    htmlFor="project-name"
                  >
                    Maximum Team Size<span className="text-red-600">*</span>
                  </label>
                  <input
                    id="maxTeamSize"
                    type="number"
                    className="form-input w-full text-gray-300"
                    placeholder="1"
                    value={maxTeamSize}
                    onChange={(e) => setMaxTeamSize(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-1"
                    htmlFor="project-name"
                  >
                    Current Team Size<span className="text-red-600">*</span>
                  </label>
                  <input
                    id="currentTeamSize"
                    type="number"
                    className="form-input w-full text-gray-300"
                    placeholder="1"
                    value={currentTeamSize}
                    onChange={(e) => setCurrentTeamSize(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-100 font-bold mb-2"
                    htmlFor="problemStatementDescription"
                  >
                    Registration Link <span className="text-red-600"></span>
                  </label>
                  <input
                    id="project-url"
                    type="url"
                    className="form-input w-full text-gray-300"
                    placeholder="https://yourproject.com"
                    value={registrationLink}
                    onChange={(e) => setRegistrationLink(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-100 font-bold mb-2"
                    htmlFor="problemStatementDescription"
                  >
                    Problem Statement Description
                  </label>
                  <textarea
                    className="form-input w-full text-gray-300"
                    id="problemStatementDescription"
                    placeholder="Enter problem statement description"
                    value={problemStatementDescription}
                    onChange={(e) =>
                      setProblemStatementDescription(e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-100 font-bold mb-2"
                    htmlFor="hackathonDate"
                  >
                    Hackathon Date
                  </label>
                  <DatePicker
                    selected={hackathonDate}
                    onChange={(date) => 
                      {
                        setHackathonDate(date)
                      } 
                      
                    }
                    className="form-input w-full text-gray-300"
                    data-date-format="yyyy-mm-dd"
                    minDate={new Date()}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-100 font-bold mb-2"
                    htmlFor="skillsRequired"
                  >
                    Skills Required
                  </label>
                  {/* <Select
                    className="form-input w-full text-black-900"
                    options={skillOptions}
                    isMulti
                    value={skillsRequired}
                    onChange={(selected) => setSkillsRequired(selected)}
                  /> */}
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
                        backgroundColor: state.isSelected ? "gray" : "black",
                        color: state.isSelected ? "black" : "white",
                      }),
                    }}
                  />
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
                {error && <div className="text-red-500">{error}</div>}
              </div>
            </div>
          </div>
        </form>
      </main>
      {/* <Banner /> */}
    </div>
  );
};

export default Hackathon;
