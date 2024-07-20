const welcomeController = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Welcome To Welcome Screen Of Api"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const testController = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Testing Router"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = { welcomeController, testController }