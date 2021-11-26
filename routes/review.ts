import app = require("teem");

class ReviewRoute {
	public async add_review(req: app.Request, res: app.Response) {
		let books: any[];

		await app.sql.connect(async (sql) => {
			books = await sql.query("SELECT titulo, autor, descricao, foto FROM book");
		});

		let opcoes = {
			books: books
		};
        
		res.render("review/add_review", opcoes);
	}
}

export = ReviewRoute;
