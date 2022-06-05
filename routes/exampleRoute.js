export default function (app){
    app.get ('/example', (req, res) => {
        res.send(" yehonatan")
        console.log("Get request is passing")
    });
}