import httpClient from "./http-client";

export default {
  getTools: () => {
    return httpClient.get(`tool`);
  },

  addTool: (payload) => {
    return httpClient.post(`tool`, payload);
  },

  upRate: (toolId, payload) => {
    return httpClient.put(`tool/${toolId}`, payload);
  },

  downRate: (toolId, payload) => {
    return httpClient.put(`tool/${toolId}`, payload);
  },

  addUserToRate: (payload) => {
    return httpClient.post(`vote`, payload);
  },

  getRateUser: (toolId) => {
    return httpClient.get(`vote/canvote/${toolId}`);
  },

  getComment: (toolId) => {
    return httpClient.get(`tool/${toolId}/reviews`);
  },

  addComment: (comment) => {
    return httpClient.post(`tool/review`, comment);
  },

  editComment: (commentId, comment) => {
    return httpClient.put(`tool/review/${commentId}`, comment);
  },

  deleteComment: (toolId, commentId) => {
    return httpClient.delete(`tool/review/${commentId}`);
  },

  searchToolsBy: query => {
    query = query || "";
    return httpClient.get("tool?" + query);
  },
  
};
