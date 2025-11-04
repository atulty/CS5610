/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addModule as addModuleAction,
  deleteModule as deleteModuleAction,
  editModule as editModuleAction,
  updateModule as updateModuleAction,
} from "./reducer";

export default function Modules() {
  const { cid } = useParams() as { cid: string };

  // Local state only for ModuleEditor input
  const [moduleName, setModuleName] = useState("");

  // Modules now come from Redux (not the static db)
  const modules = useSelector((state: any) => state.modulesReducer.modules);
  const dispatch = useDispatch();

  const addModule = () => {
    if (!moduleName.trim()) return;
    dispatch(addModuleAction({ name: moduleName.trim(), course: cid }));
    setModuleName("");
  };

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={addModule}
      />
      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => String(module.course) === String(cid))
          .map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />{" "}
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModuleAction({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(
                          updateModuleAction({ ...module, editing: false })
                        );
                      }
                    }}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId: string) =>
                    dispatch(deleteModuleAction(moduleId))
                  }
                  editModule={(moduleId: string) =>
                    dispatch(editModuleAction(moduleId))
                  }
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      className="wd-lesson p-3 ps-1"
                      key={lesson._id ?? lesson.name}
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
