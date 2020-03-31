import axios from "axios";
export default async (context) => {
    try {
        await axios.get(
            process.env.api + "/users/me", context.app.context.app.$cookies.get('header-token')
        );
    }
    catch (e) {
        return context.redirect("/login");
    }
}