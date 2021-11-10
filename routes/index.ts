import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let livros_semana: any[];

		await app.sql.connect(async (sql) => {
			livros_semana = await sql.query("SELECT titulo, autor, descricao, foto FROM book LIMIT 3");
		});

		let opcoes = {
			livros_semana: livros_semana
		};

		res.render("index/index", opcoes);
	}

	public async biblioteca(req: app.Request, res: app.Response) {
		let books: any[];

		await app.sql.connect(async (sql) => {
			books = await sql.query("SELECT titulo, autor, descricao, foto FROM book");
		});

		let opcoes = {
			books: books
		};
		res.render("index/biblioteca", opcoes);
	}
}

export = IndexRoute;
