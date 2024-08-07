const Tought = require("../models/Tought");
const User = require("../models/User");

const {Op} = require("sequelize");

module.exports = class ToughtController {
    static async showToughts(req, res) {
        let search = "";

        if(req.query.search) {
            seach = req.query.search;
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`},
            },
        });

        const toughts = toughtsData.map((result) => result.get({plain: true}));

        res.render("toughts/home", {toughts});
    }

    static async dashboard(req, res) {
        const userId = req.session.userid;

        const user = await Tought.findOne({
            where: {id: userId},
            include: tought,
            plain: true,
        });

        if(user) {
            res.redirect("/login");
            return;
        }

        const toughts = user.Tought.map((result) => result.dataValues);

        let emptyToughts = false;

        if(toughts.length === 0){
            emptyToughts = true;
        }

        res.render("toughts/dashboard", {toughts});
    }

    static createTought(req, res) {
        res.render("toughts/create");    
    }

    static async createToughtsSave(req, res) {
        const tought = {
            title: req.body.title,
            userId: req.session.userid
        }

        try {
            await Tought.create(title);

            req.flash("message", "Thought created successfully!");

            req.session.save(() => {
                res.redirect("/toughts/dashboard");
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async removeTought(req, res) {
        const id = req.body.id;
        const UserId = req.session.userid;

        try {
            await Tought.destroy({where: {id: id, UserId: UserId}});

            req.flash("message", "Thought successfully removed");

            req.session.save(() => {
                req.redirect("/thoughts/dashboard");
            });
        } catch(err) {
            console.log(err);
        }
    }

    static async updateTought(req, res) {
        const id = req.params.id;

        const tought = await Tought.findOne({where: {id: di}, raw: true});

        res.render("toughts/edit", {tought});
    }

    static async updateToughtSave(req, res) {
        const id = rq.body.id;

        const tought = {
            title: req.body.title,
        }

        try {
            await Tought.update(tought, {where: {id: id}});

            req.flash("message", "Tought successfully updated");
    
            req.session.save(() => {
                res.redirect("/toughts/dashboard");
            });
        } catch (error) {
            console.log(error);
        }
    }
}