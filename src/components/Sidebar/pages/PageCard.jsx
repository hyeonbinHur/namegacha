/* eslint-disable react/prop-types */
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
// import { SlOptions } from 'react-icons/sl';
import { AiFillFolderOpen } from 'react-icons/ai';
import FunctionContainer from '../functions/FnContainer';
import VarContainer from '../variables/VarContatiner.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    openContextMenu,
    closeContextMenu,
} from '../../../store/contextMenuSlice';
import * as contextUtil from '../../../utils/util/contextUtils.js';
import ContextMenu from '../../ContextMenu/ContextMenu.jsx';
import * as pageAPI from "../../../utils/api/axios/pageApi";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { checkLength } from '../../../utils/util/util.js';
import { isNotEmpty } from '../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';

export default function PageCard({ page }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newPageName, setNewPageName] = useState(page.pageName);

    const navigate = useNavigate();

    /**redux flags */
    const sliceIsContextOpen = useSelector(
        (state) => state.currentContextMenu.isOpen
    );
    const sliceContextTarget = useSelector(
        (state) => state.currentContextMenu.target
    );
    const sliceIsAdd = useSelector((state) => state.currentContextMenu.isAdd);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);
    const sliceAddType = useSelector(
        (state) => state.currentContextMenu.addType
    );
    /**component flags */
    const componentIsThis = contextUtil.isContextVerity(
        sliceContextTarget,
        page.pageName,
        page.pageId
    );

    const componentIsContextOpen = contextUtil.isContextOpen(
        componentIsThis,
        sliceIsContextOpen
    );

    const componentIsFunctionAdd = contextUtil.checkIsFunctionAdd(
        sliceAddType,
        componentIsThis,
        sliceIsAdd
    );
    const componentIsVariableAdd = contextUtil.checkIsVariableAdd(
        sliceAddType,
        componentIsThis,
        sliceIsAdd
    );
    const componentIsEdit = contextUtil.checkIsRename(
        componentIsThis,
        sliceIsEdit
    );

    /**Reducer & Basic functions */
    const dispatch = useDispatch();
    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
            openContextMenu({
                x: e.clientX,
                y: e.clientY,
                name: page.pageName,
                id: page.pageId,
            })
        );
    };
    const handleEditNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            const empty = isNotEmpty(newPageName);
            const max = checkLength(newPageName, 50);
            if (!empty) {
                toast.error('Page name should not be empty.');
                return;
            } else if (!max) {
                toast.error('Page name must be under 30 characters.');
                return;
            } else if (max && empty) {
                mutateUpdatePage({
                    pageId: page.pageId,
                    pageExp: '',
                    pageName: newPageName,
                });
                dispatch(closeContextMenu());
            }
        } else if (e.key === 'Escape') {
            setNewPageName(page.pageName);
            dispatch(closeContextMenu());
        }
    };
    const handleNavigateToDetail = () => {
        navigate(`/namegacha/detail/${page.pageId}`);
    };

    /**HTTP Request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdatePage } = useMutation({
        mutationFn: ({ pageId, pageName, pageExp }) => {
            return pageAPI.updatePage(pageId, pageName, pageExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    return (
        <div>
            <section onClick={() => setIsOpen((prev) => !prev)}>
                <div
                    className="side-item"
                    onContextMenu={(e) => handleContextMenu(e)}
                >
                    {isOpen ? (
                        <div className="side-item__icon">
                            <BsCaretUp className="side-item__icon__arrow" />
                            <AiFillFolderOpen className="side-item__icon__folder" />
                        </div>
                    ) : (
                        <div className="side-item__icon">
                            <BsCaretDown className="side-item__icon__arrow" />
                            <AiFillFolder className="side-item__icon__folder" />
                        </div>
                    )}
                    {componentIsEdit ? (
                        <input
                            className="side-item__input input-basic"
                            value={newPageName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setNewPageName(e.target.value)}
                            onKeyDown={(e) => handleEditNameKeyDown(e)}
                        />
                    ) : (
                        <div className="side-item__name">{page.pageName}</div>
                    )}
                </div>
            </section>
            <section className="side-item--sub">
                {isOpen && (
                    <div onClick={handleNavigateToDetail}>
                        <div>
                            <VarContainer
                                variables={page.variables}
                                page={page}
                                componentIsVariableAdd={componentIsVariableAdd}
                                handleContextMenu={handleContextMenu}
                            />
                        </div>
                        <div>
                            <FunctionContainer
                                functions={page.functions}
                                page={page}
                                componentIsFunctionAdd={componentIsFunctionAdd}
                                handleContextMenu={handleContextMenu}
                            />
                        </div>
                    </div>
                )}
            </section>
            {componentIsContextOpen && (
                <ContextMenu type={'page'} item={page} />
            )}
        </div>
    );
}
