/* eslint-disable react/prop-types */

import { lazy } from "react";
// import ProjectContextMenu from "./ProjectContextMenu";
// import PageContextMenu from "./PageContextMenu";
// import FunctionContextMenu from "./FunctionContextMenu";
// import VariableContextMenu from "./VariableContextMenu";
const ProjectContextMenu = lazy(() => import("./ProjectContextMenu"));
const PageContextMenu = lazy(() => import("./PageContextMenu"));
const FunctionContextMenu = lazy(() => import("./FunctionContextMenu"));
const VariableContextMenu = lazy(() => import("./VariableContextMenu"));

import { useSelector } from 'react-redux';

export default function ContextMenu({ type, item }) {
    const contextMenu = useSelector((state) => state.currentContextMenu);
    const style = {
        position: 'fixed',
        left: `${contextMenu.x}px`,
        top: `${contextMenu.y}px`,
        display: contextMenu.isOpen ? 'block' : 'none',
        zIndex: '10',
    };
    const renderContextMenu = () => {
        switch (type) {
            case 'project':
                return <ProjectContextMenu item={item} />;
            case 'page':
                return <PageContextMenu item={item} />;
            case 'variable':
                return <VariableContextMenu item={item} />;
            case 'function':
                return <FunctionContextMenu item={item} />;
            default:
                return <div> No Menu available</div>;
        }
    };

    return (
        <div className="context" style={style}>
            {renderContextMenu()}
        </div>
    );
}
