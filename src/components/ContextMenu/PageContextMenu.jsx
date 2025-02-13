/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';

import * as pageAPI from "../../utils/api/axios/pageApi";

import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function PageContextMenu({ item }) {
  /**Http Request */
  const queryClient = useQueryClient();
  const { mutate: deletePage } = useMutation({
    mutationFn: ({ pageId }) => {
      return pageAPI.deletePage(pageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getCertainProjects");
    },
  });

  /**Reducer & Basic Functions */
  const dispatch = useDispatch();

  const startRename = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(editItSelf({ name: item.pageName, id: item.pageId }));
  };

  const startAddFunction = (e) => {
    dispatch(
      addChild({
        addType: "function",
        name: item.pageName,
        id: item.pageId,
      })
    );
    e.stopPropagation();
  };

  const startAddVariable = (e) => {
    dispatch(
      addChild({
        addType: "variable",
        name: item.pageName,
        id: item.pageId,
      })
    );
    e.stopPropagation();
  };

  const startDelete = async () => {
    try {
      deletePage({ pageId: item.pageId });
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  return (
    <div>
      <div className="heading-quaternary">Page</div>
      <button className="context--menu" onClick={(e) => startRename(e)}>
        Rename
      </button>
      <button className="context--menu" onClick={(e) => startAddVariable(e)}>
        New Variable
      </button>
      <button className="context--menu" onClick={(e) => startAddFunction(e)}>
        New Function
      </button>
      <button className="context--menu" onClick={() => startDelete()}>
        Delete
      </button>
    </div>
  );
}
