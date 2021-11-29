import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  FileCopyOutlined as FileCopyIconOutlined,
  Refresh as RefreshIcon,
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    minHeight: 100,
    boxShadow: '1px 1px 1px #999',
    borderRadius: '14px',
    border: '1px solid grey',
  },
  content: {
    fontSize: '1.2rem',
    fontFamily: 'Nunito, sans-serif',
    color: 'black',
  },
  author: {
    marginTop: 12,
    fontSize: '1rem',
    fontFamily: 'Nunito, sans-serif',
    textAlign: 'right',
    color: 'black',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: '15px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
  },
  quoteCopiedMessage: {
    color: 'green',
    fontSize: '12px',
    marginLeft: '10px',
    fontFamily: 'Merriweather',
  },
}));

export default function QuoteCard() {
  const classes = useStyles();

  const [quote, setQuote] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteCopied, setQuoteCopied] = useState(false);

  async function fetchRandomQuote() {
    try {
      setLoadingQuote(true);
      setErrorMessage('');
      setQuoteCopied(false);
      const quoteObject = await axios.get('https://api.quotable.io/random');
      setQuote(quoteObject.data);
      setLoadingQuote(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoadingQuote(false);
    }
  }

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  function copyQuote() {
    navigator.clipboard.writeText(quote.content + ' - ' + quote.author);
    setQuoteCopied(true);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        {loadingQuote ? (
          <div>
            <Skeleton height={80} width={'38vw'} animation="wave" />
            <Skeleton height={30} width={'20vw'} animation="wave" />
          </div>
        ) : quote.content ? (
          <div>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {quote.content}
            </Typography>
            <Typography className={classes.author} color="textSecondary">
              - {quote.author}
            </Typography>
          </div>
        ) : (
          <p className={classes.errorMessage}>{errorMessage}</p>
        )}
      </CardContent>
      <CardActions disableSpacing className={classes.footer}>
        <div>
          {quoteCopied ? (
            <p className={classes.quoteCopiedMessage}>
              Quote copied to clipboard
            </p>
          ) : (
            <IconButton aria-label="copy-icon" onClick={copyQuote}>
              <FileCopyIconOutlined />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton aria-label="copy-icon" onClick={fetchRandomQuote}>
            <RefreshIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}
