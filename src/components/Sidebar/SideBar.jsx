import { GoSignOut } from "react-icons/go";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjectByUUID } from "../../utils/api/axios/projectApi.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { AiFillFolder } from "react-icons/ai";
import * as projectAPI from "../../utils/api/axios/projectApi.js";
import { useRef, useState } from "react";
import { useSignOut } from "../../hooks/useSignOut.js";
import { toast } from "react-toastify";
import { checkLength } from "../../utils/util/util.js";
import { isNotEmpty } from "../../utils/util/authUtil.js";
import { lazy, Suspense } from "react";

const ProjectCard = lazy(() => import("./projects/ProjectCard.jsx"));
const AuthModal = lazy(() => import("../Modal/Auth/AuthModal.jsx"));

// import ProjectCard from "./projects/ProjectCard.jsx";
// import AuthModal from "../Modal/Auth/AuthModal.jsx";
import logo from "../../assets/sLogo/logo-blue.png";
import Spinner from "../../assets/svgs/loading.svg";

export default function Header() {
  const { mutateSignOutUser } = useSignOut();
  const [isAdd, setIsAdd] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const { user } = useAuthContext();
  const authModal = useRef(null);

  /**Http  request */
  const queryClient = useQueryClient();
  const {
    data: projects,
    refetch: refetchGetProjects,
    isLoading,
  } = useQuery({
    queryKey: ["getCertainProjects", user?.uuid],
    queryFn: () => getProjectByUUID(user.uuid),
    onError: (error) => {
      console.error("Query failed:", error);
    },
    enabled: !!user,
  });
  const { mutate: addProject } = useMutation({
    mutationFn: ({ projectName, userId }) => {
      return projectAPI.createProject(projectName, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getCertainProjects");
    },
  });

  /** Reducer & Basic functions */
  const moveToSignInPage = () => {
    authModal.current.open();
  };

  const handleOnKeyDownCreateProject = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const empty = isNotEmpty(newProjectName);
      const max = checkLength(newProjectName, 50);
      if (!empty) {
        toast.error("Variable name should not be empty.");
        return;
      } else if (!max) {
        toast.error("Variable name must be under 30 characters.");
        return;
      } else if (max && empty) {
        addProject({
          projectName: newProjectName,
          userId: user.uuid,
        });
        setIsAdd(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsAdd(false);
      setNewProjectName("");
    }
  };

  return (
    <main className="sidebar">
      <header className="sidebar--header">
        <img src={logo} className="sidebar--header__logo" />
      </header>
      <hr className="divider sidebar--divider" />
      {user && (
        <div className="sidebar--header__sub">
          <i
            className="icon-basic-elaboration-folder-plus sidebar--icon "
            onClick={() => setIsAdd((prev) => !prev)}
          ></i>
          <i
            onClick={() => {
              refetchGetProjects(true), setIsAdd(false);
            }}
            className="icon-basic-elaboration-folder-refresh sidebar--icon"
          ></i>
        </div>
      )}
      <div className="sidebar--main">
        {isLoading ? (
          <div>
            <img
              src={Spinner}
              alt="loading spinner"
              className="loading sidebar--loading"
            />
          </div>
        ) : (
          <section>
            {user && isAdd && (
              <div className="sidebar--create">
                <AiFillFolder className="sidebar--create__icon" />
                <input
                  onKeyDown={(e) => handleOnKeyDownCreateProject(e)}
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="sidebar--create__input input-basic"
                />
              </div>
            )}

            {user ? (
              projects && projects.length > 0 ? (
                <div>
                  <ul className="ul">
                    {projects.map((project) => (
                      <li key={project.projectId} className="side-item--card">
                        <ProjectCard project={project} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="sidebar--no-project">No Projects</div>
              )
            ) : (
              <button
                className="sidebar--sign-in btn-round"
                onClick={() => moveToSignInPage()}
              >
                Sign In
              </button>
            )}
          </section>
        )}
      </div>
      <hr className="divider" />
      {user && (
        <div className="sidebar--user">
          <span className="sidebar--user__name">{user.userId}</span>
          <GoSignOut
            onClick={() => mutateSignOutUser()}
            className="sidebar--sign-out"
          />
        </div>
      )}
      <Suspense fallback={<img src={Spinner} className="chat--box__loading" />}>
        <AuthModal ref={authModal} />
      </Suspense>
    </main>
  );
}
