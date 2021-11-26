import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let reviews_semana: any[];

		await app.sql.connect(async (sql) => {
			reviews_semana = await sql.query("SELECT titulo, autor, descricao, foto FROM book LIMIT 3");
		});

		let opcoes = {
			reviews_semana: reviews_semana
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

	public async add_review(req: app.Request, res: app.Response) {
		let books: any[];

		await app.sql.connect(async (sql) => {
			books = await sql.query("SELECT id, titulo FROM book");
		});

		let opcoes = {
			books: books
		};
		res.render("index/add_review", opcoes);
	}

	@app.http.post()
	public async criarReview(req: app.Request, res: app.Response) {
		let review = req.body;
		if (!review) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}
		if (!review.nota) {
			res.status(400);
			res.json("Titulo inválido");
			return;
		}
		if (!review.descricao) {
			res.status(400);
			res.json("Ano inválido");
			return;
		}
		if (!review.book_id) {
			res.status(400);
			res.json("Ano inválido");
			return;
		}

		await app.sql.connect(async (sql) => {
			await sql.query("INSERT INTO review (nota, descricao, user_id, book_id) VALUES (?, ?, ?, ?)", [review.nota, review.descricao, 1, review.book_id]);
		});
		res.json(true);
	}
}

export = IndexRoute;
