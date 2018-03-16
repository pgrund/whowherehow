import { ActionReducerMap, createSelector, Action } from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import * as login from "./login.reducer";
import * as router from "./router.reducer";
import * as notify from "./notification.reducer";
import { getAdministrationState } from "@administration/store";

export interface State {
  routerReducer: RouterReducerState<router.RouterStateUrl>;
  auth: login.AuthState;
  notifications: notify.NotificationState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  auth: login.reducer,
  notifications: notify.reducer
};

export const getRouterState = (state: State) => state.routerReducer;
export const getBreadcrumbs = createSelector(getRouterState, router => {
  const res = router && router.state && router.state.breadcrumbs;
  return res || [];
});

// export const getMessages = (state: State) => state.messages;
// export const getErrors = createSelector(getMessages, notify.getErrors);
// export const getLastError = createSelector(
//   getErrors,
//   errors => (errors.length > 0 ? errors[0] : null)
// );
// export const getChatMessages = createSelector(getMessages, notify.getMessages);
// export const getLastChatMessage = createSelector(
//   getChatMessages,
//   chats => (chats.length > 0 ? chats[0] : null)
// );
// export const getInfos = createSelector(getMessages, notify.getInfos);
// export const getLastInfo = createSelector(
//   getInfos,
//   infos => (infos.length > 0 ? infos[0] : null)
// );

export const getAuth = (state: State) => state.auth;
export const getMyInfo = createSelector(getAuth, login.getMyInfo);
export const isAuthenticated = createSelector(getAuth, login.isAuthenticated);
export const isPartOfAGame = createSelector(
  getMyInfo,
  me => me._links.game != null
);

// export const getPlayer         = (state:State) => state.player;
// export const getPlayers        = createSelector(getPlayer, player.getPlayers);
// export const getPlayersLoaded  = createSelector(getPlayer, (player) => player.loaded);
// export const getPlayersOfSession = (id:number) => createSelector(getPlayers, players => players.filter(p => p._links.game && p._links.game.href.endsWith('/'+id)));

// export const getSession        = (state: State) => state.session;
// export const getSessions       = createSelector(getSession, session.getSessions);
// export const isSessionSelected = createSelector(getSession, session.isSelected);

// export const getSingleSession  = (id:number) => createSelector(getSessions, sessions => sessions.find(s => s._links.self.href.endsWith('/'+id)));
// export const getSessionDetail  = (id:number) => createSelector(getSingleSession(id), getPlayersOfSession(id),(session, players) => {
//   session.players = players;
//   return session;
// });
//export const getSessionsLoaded = createSelector(getSession, (session) => session.loaded);

// export const getMyDetailedInfo = createSelector(
//   getMyInfo,
//   getSessions,
//   isPartOfAGame,
//   (me, sessions, hasGame) => ({
//     me: me,
//     game: hasGame
//       ? sessions.find(s => s.sessionName == me._links.game.name)
//       : null
//   })
// );
// export const getMyGame = createSelector(getMyDetailedInfo, info => {
//   console.log("my game", info);
//   return info.game;
// });
// export const getMyGameClosed = createSelector(
//   getMyGame,
//   game => game._links.turn != null
// );
// export const getMyGameDetail = createSelector(
//   getMyDetailedInfo,
//   getPlayers,
//   (myInfo, players) => {
//     myInfo.game.players = players.filter(
//       p => p._links.game && p._links.game.href == myInfo.me._links.game.href
//     );
//     let me = myInfo.game.players.find(
//       p => p._links.self.href == myInfo.me._links.self.href
//     );

//     return {
//       myself: {
//         ...myInfo.me,
//         ...me
//       },
//       session: myInfo.game
//     };
//   }
// );

export const getNotificationState = (state: State) => state.notifications;

export { CustomSerializer } from "./router.reducer";
//export * from "./login.reducer";
