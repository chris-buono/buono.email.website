import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className='min-h-screen max-h-screen'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;