/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import * as client from "../../client";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule as addModuleAction,
  deleteModule as deleteModuleAction,
  editModule as editModuleAction,
  updateModule as updateModuleAction,
} from "./reducer";

export default function Modules() {
  const { cid } = useParams() as { cid: string };

  // Local state only for ModuleEditor input
  const [moduleName, setModuleName] = useState("");

  // Modules now come from Redux
  const modules = useSelector((state: any) => state.modulesReducer.modules);
  const dispatch = useDispatch();

  // 🔄 Fetch modules from server for this course
  const fetchModules = async () => {
    if (!cid) return;
    try {
      const serverModules = await client.findModulesForCourse(cid as string);
      dispatch(setModules(serverModules));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  // ✅ Create module on server, then update Redux (preserving your local add behavior)
  const onCreateModuleForCourse = async () => {
    if (!moduleName.trim() || !cid) return;
    try {
      const newModuleData = { name: moduleName.trim(), course: cid };
      const createdModule = await client.createModuleForCourse(
        cid as string,
        newModuleData
      );
      dispatch(addModuleAction(createdModule));
      setModuleName("");
    } catch (error) {
      console.error("Error creating module:", error);
      alert("Failed to create module. Please try again.");
    }
  };

  // ✅ Delete module on server, then use your Redux deleteModule
  const onRemoveModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      dispatch(deleteModuleAction(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module. Please try again.");
    }
  };

  // ✅ Update module on server, then your Redux updateModule
  const onUpdateModule = async (module: any) => {
    try {
      const updatedModule = await client.updateModule(module);
      dispatch(updateModuleAction(updatedModule));
    } catch (error) {
      console.error("Error updating module:", error);
      alert("Failed to update module. Please try again.");
    }
  };

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        // use server-backed create instead of purely local add
        addModule={onCreateModuleForCourse}
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
                        updateModuleAction({
                          ...module,
                          name: e.target.value,
                        })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId: string) => onRemoveModule(moduleId)}
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
