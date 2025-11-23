const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { SimpleLinearRegression } = require('ml-regression-simple-linear');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "igest1.1",
})

app.use(cors());
app.use(express.json())


// registo e login de utilizador abaixo


const bcrypt = require('bcrypt');

app.post("/registoUser", async (req, res) => {
    const { id, nome, sobrenome, nascimento, password, idFamilia, parentesco } = req.body;

    try {
        // Gerar um salt para a encriptação
        const salt = await bcrypt.genSalt(10);

        // Encriptar a password
        const hashedPassword = await bcrypt.hash(password, salt);

        let SQL = "INSERT INTO usuario(id, nome, sobrenome, nascimento, password, idFamilia, parentesco) VALUES (?,?,?,?,?,?,?)";

        db.query(SQL, [id, nome, sobrenome, nascimento, hashedPassword, idFamilia,parentesco], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Erro ao registar o utilizador.");
            }
            res.status(201).send("Utilizador registado com sucesso.");
            console.log(result);
        });
    } catch (error) {
        console.error(error);

        res.status(500).send("Erro ao processar a solicitação.");
    }
});


// app.post("/loginUser", (req, res) => {
//     const { nome } = req.body;

//     const { password } = req.body;


//     let SQL = "SELECT nome, id, idFamilia FROM utilizador WHERE nome = ? AND password = ?";

//     db.query(SQL, [nome, password], (err, result) => {
//         // console.log(err);
//         if (err) console.log(err);
//         else res.send(result);
//         console.log(result);
//     });
// });


// 


app.post("/loginUser", (req, res) => {
    const { nome, password } = req.body;

    // Verifique se os dados foram fornecidos

    if (!nome || !password) {
        return res.status(400).send("Nome e senha são obrigatórios.");
    }

    // Consulta ao banco de dados para obter a senha hash
    let SQL = "SELECT id, idFamilia, nome, password FROM usuario WHERE id = ?";

    db.query(SQL, [nome], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro ao buscar o usuário.");
        }

        // Verifique se o usuário foi encontrado
        console.log("Resultado da consulta:", result);
        if (result.length === 0) {
            return res.status(401).send("Usuário não encontrado.");
        }

        const hashedPassword = result[0].password;
        console.log("Hash da senha armazenada:", hashedPassword);


        // Compare a senha fornecida com o hash armazenado
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            console.log("Senha correspondente:", match);
            if (match) {
                console.log('Login bem-sucedido');
                res.status(200).send({
                    message: "Login bem-sucedido.",
                    user: {
                        id: result[0].id,
                        idFamilia: result[0].idFamilia,
                        nome: result[0].nome
                    }
                });
            } else {
                res.status(401).send("Senha incorreta.");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Erro ao verificar a senha.");
        }
    });
});


// 

// registo e login de utilizador acima

app.post("/registoGasto", (req, res) => {
    const { categoria } = req.body;
    const { nomeGasto } = req.body;
    const { valorGasto } = req.body;
    const { dataGasto } = req.body;
    const { tipo_gasto } = req.body;
    const { idUsuario } = req.body;



    let SQL = "INSERT INTO gastos(categoria, produto, valor, data, idUsuario) VALUES (?,?,?,?,?)";

    db.query(SQL, [categoria, nomeGasto, valorGasto, dataGasto, idUsuario], (err, result) => {
        // console.log(err);
        if (err) console.log(err);
        else res.send(result);
        console.log(result);
        console.log(valorGasto);
    });
});

// app.get("/getGastos", (req,res)=>{

//     let SQL = "SELECT * from gastos";

//     db.query(SQL, (err,result) => {
//         if(err) console.log(err);
//         else res.send(result);
//         console.log(result);
//     });
// });

app.get('/getGastos', (req, res) => {

    const valor = req.query.valor;
    console.log("agora sima ", valor);

    const sql = 'SELECT * FROM gastos WHERE idUsuario = ?';
    db.query(sql, [valor], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


// Rendimentos instruçoes abaixo

app.post("/registoRendimento", (req, res) => {
    const { fonteRendimento } = req.body;
    const { valorRendimento } = req.body;
    const { data } = req.body;
    const { idUsuario } = req.body;

    let SQL = "INSERT INTO rendimentos(fonte_rendimento, valor, data, idUsuario) VALUES (?,?,?,?)";

    db.query(SQL, [fonteRendimento, valorRendimento, data, idUsuario], (err, result) => {
        // console.log(err);
        if (err) console.log(err);
        else res.send(result);
        console.log(result);
    });
});

app.get('/getRendimentos', (req, res) => {

    const valor = req.query.valor;
    console.log("agora sim " + valor);
    const sql = 'SELECT * FROM rendimentos WHERE idUsuario = ?';
    db.query(sql, [valor], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Rendimentos instruçoes acima

// Poupanças instruçoes abaixo

app.post("/registoPoupanca", (req, res) => {
    const { objectivo } = req.body;
    const { valorPrevisto } = req.body;
    const { valorMensal } = req.body;
    const { dataPoupanca } = req.body;
    const { idUsuario } = req.body;
    const { tempoPoupanca } = req.body;

    let SQL = "INSERT INTO poupancas(objectivo, tempoPoupanca, dataPoupanca, idUsuario, valorPrevisto, valorMensal) VALUES (?,?,?,?,?,?)";

    db.query(SQL, [objectivo, tempoPoupanca, dataPoupanca, idUsuario, valorPrevisto, valorMensal], (err, result) => {
        // console.log(err);
        if (err) console.log(err);
        else res.send(result);
        console.log(result);
    });
});

app.get('/getPoupancas', (req, res) => {

    const valor = req.query.valor;
    console.log("agora simm " + valor);

    const sql = 'SELECT * FROM poupancas WHERE idUsuario = ?';
    db.query(sql, [valor], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post("/atualizarValorAtual", (req, res) => {
    const { idPoupanca, valorAdd } = req.body; // Recebe o ID da poupança e o novo valor atual
    console.log("tet" + valorAdd);
    let SQL = "UPDATE poupancas SET valorActual = valorActual + ? WHERE id = ?";

    db.query(SQL, [valorAdd, idPoupanca], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao atualizar o valor atual.");
        } else {
            res.send("Valor atual atualizado com sucesso!");
            console.log(result);
        }
    });
});

// Poupanças instruçoes acima


// Poupanças instruçoes abaixo

app.post("/registoFamilia", (req, res) => {
    const { nomeFamilia } = req.body;
    const { endereco } = req.body;


    let SQL = "INSERT INTO familia(nomeFamilia, endereco) VALUES (?,?)";

    db.query(SQL, [nomeFamilia, endereco], (err, result) => {
        // console.log(err);
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao registrar a família");
        } else {
            console.log(result);
            res.send({ id: result.insertId });
        }
    });


});

// app.post("/procuraIdFamilia", (req, res) => {
//     const { id } = req.body;

//     let SQL = "SELECT idFamilia FROM utilizador WHERE id = ?";

//     db.query(SQL, [id], (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send("Erro ao procurar ID da família");
//         } else if (result.length > 0) {
//             res.send({ exists: true, id: result[0].id });
//         } else {
//             res.send({ exists: false });
//         }
//         console.log(result);
//     });
// });

app.post("/procuraIdFamilia", (req, res) => {
    const { idFamilia } = req.body; // Obtém o ID do corpo da requisição
    console.log("dde");
    let SQL = "SELECT id FROM familia WHERE id = ?";

    db.query(SQL, [idFamilia], (err, result) => { // Usa o ID passado na requisição
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao procurar ID da família");
        } else if (result.length > 0) {
            res.send({ exists: true, id: result[0].id });
        } else {
            res.send({ exists: false });
        }
        console.log(result);
    });
});


app.post("/procuraNomeFamilia", (req, res) => {
    const { idFamilia } = req.body;

    let SQL = "SELECT nomeFamilia FROM familia WHERE id = ?";

    db.query(SQL, [idFamilia], (err, result) => {

        if (err) console.log(err);
        else res.send(result);
        console.log(result);

    });
});

// Poupanças instruçoes acima

// saldo acima
app.post("/pegarSaldo", (req, res) => {
    const { idActual } = req.body;

    let SQL = "SELECT valor FROM saldo WHERE idUser = ?";

    db.query(SQL, [idActual], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
        console.log(result);
    });
});

app.post("/atualizarSaldo", (req, res) => {
    const { idActual, novoValor } = req.body;

    let SQL1 = "SELECT valor FROM saldo WHERE idUser = ?";

    db.query(SQL1, [idActual], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro ao buscar saldo");
        }

        console.log("Saldo atual:", result);

        let SQL = "UPDATE saldo SET valor = ? WHERE idUser = ?";

        db.query(SQL, [novoValor, idActual], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Erro ao atualizar o saldo");
            } else {
                console.log("Saldo atualizado com sucesso:", result);
                return res.send("Saldo atualizado com sucesso");
            }
        });
    });
});

app.post("/criarSaldo", (req, res) => {
    const { id } = req.body;
    const valor = 0;
    console.log("entrou")
    let SQL = "INSERT INTO saldo(idUser, valor) VALUES (?,?)";

    db.query(SQL, [id, valor], (err, result) => {
        // console.log(err);
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao registrar a saldo");
        } else {
            console.log(result);
            res.send({ id: result.insertId });
        }
    });


});


// Função de previsão usando regressão linear
// app.post("/previsao", (req, res) => {
//     const { id } = req.body;
//     console.log("ttrr"+id);
//     const query = `
//      SELECT 
//         DATE_FORMAT(STR_TO_DATE(data, '%e/%c/%Y'), '%Y-%m') AS mes,
//         SUM(valor) AS total
//     FROM gastos
//     WHERE idUsuario = ?
//     GROUP BY mes
//     ORDER BY mes ASC;
//   `;

//     db.query(query, [id], (err, results) => {
//         if (err) return res.status(500).json(err);
//         console.log("📊 Resultados SQL:", results);
//         if (results.length < 2) {
//             // Se tiver poucos dados, retorna média simples
//             const media = results.reduce((a, b) => a + parseFloat(b.total), 0) / results.length || 0;
//             return res.json({ previsao: media });

//         }

//         // Cria arrays de dados para regressão
//         const x = results.map((_, i) => i + 1); // meses como números sequenciais
//         const y = results.map(row => parseFloat(row.total)); // total de gastos

//         // Cria o modelo de regressão linear
//         const regressao = new SimpleLinearRegression(x, y);

//         // Faz previsão para o "próximo mês"
//         const proximoMes = x.length + 1;
//         const previsao = regressao.predict(proximoMes);
//         console.log("predict = "+previsao);
//         res.json({
//             dados: results,
//             previsao: parseFloat(previsao.toFixed(2)),
//             tendencia: regressao.slope >= 0 ? "aumentando" : "diminuindo"
//         });

//     });
// });

// app.post("/previsao", (req, res) => {
//   const { id } = req.body;
//   console.log("🧩 ID recebido:", id);

//   const query = `
//     SELECT 
//       DATE_FORMAT(STR_TO_DATE(data, '%d/%m/%Y'), '%Y-%m') AS mes,
//       SUM(valor) AS total
//     FROM gastos
//     WHERE idUsuario = ?
//     GROUP BY mes
//     ORDER BY mes ASC;
//   `;

//   db.query(query, [id], (err, results) => {
//     if (err) {
//       console.error("❌ Erro SQL:", err);
//       return res.status(500).json(err);
//     }

//     if (!results || results.length === 0) {
//       return res.json({ mensagem: "Sem dados suficientes." });
//     }

//     console.log("📊 Resultados SQL:", results);

//     // Se tiver poucos dados, retorna média simples
//     if (results.length < 2) {
//       const media = results.reduce((a, b) => a + parseFloat(b.total), 0) / results.length;
//       console.log("📈 Média simples:", media);
//       return res.json({ previsao: parseFloat(media.toFixed(2)), metodo: "média simples" });
//     }

//     // Remove outliers (valores 2x maiores que a média)
//     const valores = results.map(r => parseFloat(r.total));
//     const media = valores.reduce((a, b) => a + b, 0) / valores.length;
//     const filtrados = results.filter(r => parseFloat(r.total) <= media * 2);

//     console.log(`📉 Removidos ${results.length - filtrados.length} outliers`);

//     // Se todos foram removidos, usa os originais
//     const dados = filtrados.length >= 2 ? filtrados : results;

//     // Cria arrays para regressão
//     const x = dados.map((_, i) => i + 1);
//     const y = dados.map(r => parseFloat(r.total));

//     // Cria modelo de regressão linear
//     const regressao = new SimpleLinearRegression(x, y);

//     // Faz previsão para o próximo mês
//     const proximoMes = x.length + 1;
//     let previsao = regressao.predict(proximoMes);

//     // Evita negativos
//     previsao = Math.max(0, previsao);

//     console.log("🔮 Previsão calculada:", previsao.toFixed(2));
//     console.log("📈 Tendência:", regressao.slope >= 0 ? "aumentando" : "diminuindo");

//     res.json({
//       dados,
//       previsao: parseFloat(previsao.toFixed(2)),
//       tendencia: regressao.slope >= 0 ? "aumentando" : "diminuindo",
//       metodo: "regressão linear"
//     });
//   });
// });

app.post("/previsao", (req, res) => {
    const { id } = req.body;
    console.log("📨 Requisição recebida para ID:", id);

    const query = `
    SELECT 
      DATE_FORMAT(STR_TO_DATE(data, '%d/%m/%Y'), '%Y-%m') AS mes,
      SUM(valor) AS total
    FROM gastos
    WHERE idUsuario = ?
    GROUP BY mes
    ORDER BY mes ASC;
  `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("❌ Erro MySQL:", err);
            return res.status(500).json({ erro: "Erro ao consultar o banco de dados" });
        }

        if (!results || results.length === 0) {
            return res.json({ previsao: 0, tendencia: "sem dados" });
        }

        // ✅ Remover outliers extremos
        const valores = results.map(r => parseFloat(r.total));
        const media = valores.reduce((a, b) => a + b, 0) / valores.length;
        const limite = media * 2;
        const filtrados = results.filter(r => parseFloat(r.total) <= limite);

        console.log("📊 Dados filtrados:", filtrados);

        // Caso tenha poucos dados, faz média simples
        if (filtrados.length < 2) {
            const mediaSimples =
                filtrados.reduce((a, b) => a + parseFloat(b.total), 0) / filtrados.length || 0;
            console.log("ℹ️ Média simples usada:", mediaSimples);
            return res.json({
                previsao: parseFloat(mediaSimples.toFixed(2)),
                tendencia: "neutra"
            });
        }

        // ✅ Criar arrays x e y
        const x = filtrados.map((_, i) => i + 1);
        const y = filtrados.map(r => parseFloat(r.total));

        // ✅ Regressão linear
        const regressao = new SimpleLinearRegression(x, y);
        const proximoMes = x.length + 1;
        const previsao = regressao.predict(proximoMes);

        // ✅ Evita valor negativo
        const previsaoFinal = Math.max(0, parseFloat(previsao.toFixed(2)));

        console.log("📈 Previsão:", previsaoFinal, " | Tendência:", regressao.slope >= 0 ? "aumentando" : "diminuindo");
        const filtradosNumericos = filtrados.map(r => ({
            mes: r.mes,
            total: Number(r.total)
        }));
        return res.json({
            dados: filtradosNumericos,
            previsao: previsaoFinal,
            meses: results.length,
            tendencia: regressao.slope >= 0 ? "aumentando" : "diminuindo"
        });
    });
});




// app.get('/pegarSaldo', (req, res) => {
//     const { idActual } = req.body;
//     let SQL = "SELECT * FROM saldo WHERE idUser = ?";
//     db.query(sql, (err, results) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       res.json(results);
//     });
//   });
// saldo acima

app.listen(3001, () => {
    console.log("rodando servidor");
});