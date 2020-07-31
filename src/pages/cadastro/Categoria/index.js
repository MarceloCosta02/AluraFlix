import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField/index.js';
import Button from '../../../components/Button';

function CadastroCategoria() {
    const [categorias, setCategorias] = useState([]);

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }
    const [values, setValues] = useState(valoresIniciais);

    function setValue (chave, valor) {
        setValues({
            ...values,
            [chave]: valor
        })
    }

    function handleChange(e) {
        setValue(
            e.target.getAttribute('name'),
            e.target.value
        );
    }                
    
    useEffect(() => {
        const URL = 'http://localhost:8080/categorias'
        fetch(URL).then(async (response) => {
            const data = await response.json();
            setCategorias([
                ...data,
            ]);
        })
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias, // Pega tudo oq ja escreveu, nao sobrescreve, e coloca por baixo a nova
                    values
                ]);
                setValues(valoresIniciais)
            }}> 

                <FormField 
                    label="Nome da Categoria"
                    name="nome"
                    type="text"
                    value={values.nome}
                    onChange={handleChange}
                />

                <FormField 
                    label="Descrição"
                    name="descricao"
                    type="textarea"
                    value={values.descricao}
                    onChange={handleChange}
                />
             
                <FormField 
                    label="Cor"
                    name="cor"
                    type="color"
                    value={values.cor}
                    onChange={handleChange}
                />                           

                <Button>
                    Cadastrar
                </Button>
            </form>

            { categorias.length === 0 && (
                <div>
                Loading...
            </div>
            )}

            <ul>
                {categorias.map((categorias) => {
                    return (
                        <li key={`${categorias.nome}`}>
                            {categorias.nome}
                        </li>
                    )                 
                })}
            </ul>
      
            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;