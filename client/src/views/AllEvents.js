import React, { useEffect, useState } from "react";
import { getEvents } from "../api/events.js";

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getAllEvents() {
      try {
        const eventsList = await getEvents();
        setEvents(eventsList.data);
        console.log(eventsList.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Please log in or sign up to view all events.");
        } else {
          setErrorMessage(
            "An error occurred while fetching events. Error: " + error.message
          );
        }

        setEvents([]);
      }

      setIsLoading(false);
    }

    getAllEvents();

    return () => {};
  }, []);

  return (
    <section id="gallery">
      <div className="container">
        <div className="row">
          {errorMessage && (
            <div
              className="alert alert-danger col-lg-4 mx-auto mt-5"
              role="alert"
            >
              <div className="d-flex justify-content-center max-w-lg">
                {errorMessage}
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="text-center mt-5">
              <i className="fa fa-spinner fa-spin fa-2x"></i>
            </div>
          ) : (
            events.map((event) => (
              <div className="col-lg-4 mb-4" key={event.id}>
                <div className="card">
                  <img
                    src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">Venue: {event.venue}</li>
                  </ul>
                  <div className="card-body">
                    <button className="btn btn-primary px-3">Edit</button>
                    <button className="btn btn-danger px-3 ms-3">Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AllEvents;

// import axios from "axios";
// import React, { useEffect, useCallback, useState } from "react";
// import config from "../config";

// const axiosInstance = axios.create({
//   baseURL: config.API_BASE_URL,
// });

// function AllEvents() {
//   const [events, setEvents] = useState([]);

//   const getEvents = useCallback(
//     async (source) => {
//       try {
//         const response = await axiosInstance.get("/events", {
//           // Use Axios' built in cancel functionality. Token is to associate it with the exact instance of the request
//           cancelToken: source.token,
//         });
//         setEvents(response.data);
//         console.log(response.data);
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log("Request canceled:", error.message);
//         } else {
//           console.log("Request error:", error.message);
//         }
//       }
//     },
//     [axiosInstance]
//   );

//   useEffect(() => {
//     const source = axios.CancelToken.source();

//     getEvents(source);

//     return () => {
//       source.cancel();
//     };
//   }, [getEvents]);

//   return (
//     <section id="gallery">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-4 mb-4">
//             <div className="card">
//               <img
//                 src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
//                 alt=""
//                 className="card-img-top"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Sunset</h5>
//                 <p className="card-text">
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
//                   eum similique repellat a laborum, rerum voluptates ipsam eos
//                   quo tempore iusto dolore modi dolorum in pariatur. Incidunt
//                   repellendus praesentium quae!
//                 </p>
//                 <button className="btn btn-primary px-3">Edit</button>
//                 <button className="btn btn-danger px-3 ms-3">Delete</button>
//                 {/* <a href="" className="btn btn-outline-success btn-sm">
//                   Read More
//                 </a>
//                 <a href="" className="btn btn-outline-danger btn-sm">
//                   <i className="far fa-heart"></i>
//                 </a> */}
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-4 mb-4">
//             <div className="card">
//               <img
//                 src="https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
//                 alt=""
//                 className="card-img-top"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Sunset</h5>
//                 <p className="card-text">
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
//                   eum similique repellat a laborum, rerum voluptates ipsam eos
//                   quo tempore iusto dolore modi dolorum in pariatur. Incidunt
//                   repellendus praesentium quae!
//                 </p>
//                 <button className="btn btn-primary px-3">Edit</button>
//                 <button className="btn btn-danger px-3 ms-3">Delete</button>
//                 {/* <a href="" className="btn btn-outline-success btn-sm">
//                   Read More
//                 </a>
//                 <a href="" className="btn btn-outline-danger btn-sm">
//                   <i className="far fa-heart"></i>
//                 </a> */}
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-4 mb-4">
//             <div className="card">
//               <img
//                 src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
//                 alt=""
//                 className="card-img-top"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Sunset</h5>
//                 <p className="card-text">
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
//                   eum similique repellat a laborum, rerum voluptates ipsam eos
//                   quo tempore iusto dolore modi dolorum in pariatur. Incidunt
//                   repellendus praesentium quae!
//                 </p>
//                 <button className="btn btn-primary px-3">Edit</button>
//                 <button className="btn btn-danger px-3 ms-3">Delete</button>
//                 {/* <a href="" className="btn btn-outline-success btn-sm">
//                   Read More
//                 </a>
//                 <a href="" className="btn btn-outline-danger btn-sm">
//                   <i className="far fa-heart"></i>
//                 </a> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//     // <section id="gallery">
//     //   <div className="container">
//     //     <div className="row">
//     //       {events.map((event) => (
//     //         <div className="col-lg-4 mb-4" key={event.id}>
//     //           <div className="card">
//     //             <img
//     //               src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
//     //               alt=""
//     //               className="card-img-top"
//     //             />
//     //             <div className="card-body">
//     //               <h5 className="card-title">{event.title}</h5>
//     //               <p className="card-text">{event.description}</p>
//     //               <button className="btn btn-primary px-3">Edit</button>
//     //               <button className="btn btn-danger px-3 ms-3">Delete</button>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       ))}
//     //     </div>
//     //   </div>
//     // </section>
//   );
// }

// export default AllEvents;
