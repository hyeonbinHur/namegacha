/* eslint-disable react/prop-types */
import { AiFillFolder } from 'react-icons/ai';
import { AiFillFolderOpen } from 'react-icons/ai';
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import PageCard from '../pages/PageCard.jsx';
// import './projectCard.css';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as PageAPI from '../../../utils/api/aws/pageRoutes.js';
import * as projectAPI from '../../../utils/api/aws/projectRoutes.js';
import { useSelector, useDispatch } from 'react-redux';
import {
    openContextMenu,
    clearContextMenu,
} from '../../../store/contextMenuSlice.js';
import * as contextUtil from '../../../utils/util/contextUtils.js';
import ContextMenu from '../../../components/ContextMenu/ContextMenu.jsx';
import { checkLength } from '../../../utils/util/util.js';
import { isNotEmpty } from '../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';

export default function ProjectCard({ project }) {
    const [isOpen, setIsOpen] = useState(false);
    const [projectName, setProjectName] = useState(project.projectName || '');
    const [newPageName, setNewPageName] = useState('');

    /**Slice variables*/
    const sliceContextTarget = useSelector(
        (state) => state.currentContextMenu.target
    );
    const sliceIsContextOpen = useSelector(
        (state) => state.currentContextMenu.isOpen
    );
    const sliceIsAdd = useSelector((state) => state.currentContextMenu.isAdd);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);

    /** Variables & flags */
    const componentIsThis = contextUtil.isContextVerity(
        sliceContextTarget,
        project.projectName,
        project.projectId
    );
    const componentIsContextOpen = contextUtil.isContextOpen(
        componentIsThis,
        sliceIsContextOpen
    );
    const componentIsEdit = contextUtil.checkIsRename(
        componentIsThis,
        sliceIsEdit
    );
    const componentIsAdd = contextUtil.checkIsAdd(componentIsThis, sliceIsAdd);

    /** HTTP request */
    const queryClient = useQueryClient();
    const { mutate: addPage } = useMutation({
        mutationFn: ({ pageName, pageExp, projectId }) => {
            return PageAPI.createPage(projectId, pageName, pageExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const { mutate: updateProject } = useMutation({
        mutationFn: ({ newProjectName, projectId }) => {
            return projectAPI.updateProject(projectId, newProjectName);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    /**Reducer & Basic Functions */
    const dispatch = useDispatch();
    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
            openContextMenu({
                x: e.clientX,
                y: e.clientY,
                name: project.projectName,
                id: project.projectId,
            })
        );
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(clearContextMenu());
            const empty = isNotEmpty(projectName);
            const max = checkLength(projectName, 50);
            if (!empty) {
                toast.error('Project name should not be empty.');
                return;
            } else if (!max) {
                toast.error('Project name must be under 30 characters.');
                return;
            } else if (max && empty) {
                updateProject({
                    newProjectName: projectName,
                    projectId: project.projectId,
                });
                dispatch(clearContextMenu());
            }
        } else if (e.key === 'Escape') {
            dispatch(clearContextMenu());
            setProjectName(project.projectName);
        }
    };

    const handleKeyDownAddPage = (e) => {
        if (e.key === 'Enter') {
            const empty = isNotEmpty(newPageName);
            const max = checkLength(newPageName, 50);
            if (!empty) {
                toast.error('Project name should not be empty.');
                return;
            } else if (!max) {
                toast.error('Project name must be under 30 characters.');
                return;
            } else if (max && empty) {
                addPage({
                    pageName: newPageName,
                    pageExp: '',
                    projectId: project.projectId,
                });
                dispatch(clearContextMenu());
                setNewPageName('');
            }
        } else if (e.key === 'Escape') {
            dispatch(clearContextMenu());
            setNewPageName('');
        }
    };

    return (
        <>
            <div>
                <div
                    className="side-item"
                    onContextMenu={(e) => handleContextMenu(e)}
                >
                    {isOpen ? (
                        <div
                            className="side-item__icon"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            <BsCaretUp className="side-item__icon__arrow" />
                            <AiFillFolderOpen className="side-item__icon__folder" />
                        </div>
                    ) : (
                        <div
                            className="side-item__icon"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            <BsCaretDown className="side-item__icon__arrow" />
                            <AiFillFolder className="side-item__icon__folder" />
                        </div>
                    )}

                    {componentIsEdit ? (
                        <input
                            className="side-item__input input-basic"
                            value={projectName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setProjectName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    ) : (
                        <div className="side-item__name">
                            {project.projectName}
                        </div>
                    )}

                    {/* <i
                    className="side-item__icon__plus icon-basic-elaboration-browser-plus "
                    onClick={
                        () => setIsAdd(true)
                        // addPage({
                        //     projectId: project.projectId,
                        //     pageExp: '',
                        //     pageName: 'add page test',
                        // })
                    }
                ></i> */}
                </div>

                {isOpen == true && (
                    <ul className="side-item--sub ul">
                        {componentIsAdd && (
                            <div className="side-item--create__page">
                                <AiFillFolder className="side-item__icon__folder" />
                                <input
                                    className="side-item__input input-basic"
                                    value={newPageName}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        setNewPageName(e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDownAddPage(e)}
                                />
                            </div>
                        )}
                        {project.pages.map((page) => (
                            <li key={page.pageId} className="li">
                                <PageCard page={page} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                {componentIsContextOpen && (
                    <ContextMenu type={'project'} item={project} />
                )}
            </div>
        </>
    );
}
