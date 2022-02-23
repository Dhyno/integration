

exports.testFunc = async (req, res) => {
    res.send({
        status: "success",
        user: req.user.id
    })
}