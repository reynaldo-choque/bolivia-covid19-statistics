import * as React from "react";
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import "./Header.scss";
import {v4 as uuidv4} from 'uuid';

const ns = "header"

const Header = (props) => {
    return (
        <header className={`${ns}`}>
            <CardDeck>
                {
                    props.total.map(
                        card => (<Card
                            key={uuidv4()}
                            text={card.title}
                            className={`${ns}__custom-card ${ns}__custom-card--${card.additionalCls}`}
                        >
                            <Card.Header>{card.title}</Card.Header>
                            <Card.Body>
                                <Card.Title> {card.total} </Card.Title>
                            </Card.Body>
                        </Card>)
                    )
                }

            </CardDeck>
        </header>
    );
};

export default Header;