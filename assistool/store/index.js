export const actions = {
    
    async nuxtServerInit({dispatch, commit}, {req}) {
 
        // Get session ID:
        const sessionId = req.session.id;
        return sessionId;
    }
};