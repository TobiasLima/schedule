// @flow 
import React, { FormEvent } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import bodyParser from 'body-parser';
import util from 'util';
import { http } from '../util/http';

const getBody = util.promisify(bodyParser.urlencoded());

type EmailPageProps = {
  name: string;
  success: boolean;
};

const EmailPage: NextPage<EmailPageProps> = (props) => {

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const subject = document.getElementById("subject") as HTMLInputElement;
    await http.post('/api/email', {
      subject
    });
    console.log('Email enviado');
  }

  return (
    <div>
      <h1>Formuçário de envio de e-mail</h1>
      <form method="post" onSubmit={onSubmit} >
        <input type="text" name="subject" id="subject" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default EmailPage;

const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {req, res} = ctx;
  if(req.method === 'POST') {
    await getBody(req, res);

    
  }

  return {
    props: {
     name: "Tobias Lima" 
    }
  }
}