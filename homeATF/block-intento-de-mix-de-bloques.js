/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const { RichText, MediaUpload } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

import TestEdit from './block-old.js';
// import './style.scss';
// import './editor.scss';

// Our filter function
function setBlockCustomClassName( className, blockName ) {
	return blockName === 'card-block/home-atf' ? '' : className;
}
// Adding the filter
wp.hooks.addFilter( 'blocks.getBlockDefaultClassName', 'gutenTag', setBlockCustomClassName );

registerBlockType( 'card-block/home-atf', {
	title: 'homeATF',
	icon: 'heart',
	category: 'common',
	attributes: {
		videoUrl: { attribute: 'src', selector: '.videoATFSrc' },
		logoUrl: { attribute: 'src', selector: '.videoATFSrc' },
		logoAlt: { attribute: 'alt', selector: '.card__image' },
		copyATF: { type: 'array', source: 'children', selector: '.copyATF' },
		card1Url: { attribute: 'src', selector: '.videoATFSrc' },
		card1Alt: { attribute: 'alt', selector: '.card__image' },
		card1Text: { type: 'array', source: 'children', selector: '.card1Text' },
		card2Url: { attribute: 'src', selector: '.videoATFSrc' },
		card2Alt: { attribute: 'alt', selector: '.card__image' },
		card2Text: { type: 'array', source: 'children', selector: '.card2Text' },
		card3Url: { attribute: 'src', selector: '.videoATFSrc' },
		card3Alt: { attribute: 'alt', selector: '.card__image' },
		card3Text: { type: 'array', source: 'children', selector: '.card3Text' },
		cards: { type: 'array', default: [
			{
				id: 'este es el key de la tarjeta',
				url: '',
				alt: '',
				txt: 'y hay un txt tambien',
			},
		] },
	},

	edit( { attributes, setAttributes } ) {
		const getVideoButton = openEvent => attributes.videoUrl ? <video className="videoATF" onClick={ openEvent } loop="loop" autoPlay={ 'true' } playsinline={ 'true' } muted={ 'true' }><source src={ attributes.videoUrl }></source></video> : <div className="videoATF"><Button onClick={ openEvent } className="button button-large" >Pick a background video</Button></div>;
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		const getLogoButton = openEvent => attributes.logoUrl ? <img src={ attributes.logoUrl } onClick={ openEvent } className="ATFLogo itemImg" alt={ 'si' } /> : <div className={ 'ATFLogo itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick a Logo image</Button></div>;
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		const getcad1ImgButton = openEvent => attributes.card1Url ? <img src={ attributes.card1Url } onClick={ openEvent } className={ 'standarCardImg itemImg' } alt={ 'si' } /> : <div className={ 'standarCardImg itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		const getcad2ImgButton = openEvent => attributes.card2Url ? <img src={ attributes.card2Url } onClick={ openEvent } className={ 'standarCardImg itemImg' } alt={ 'si' } /> : <div className={ 'standarCardImg itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		const getcad3ImgButton = openEvent => attributes.card3Url ? <img src={ attributes.card3Url } onClick={ openEvent } className={ 'standarCardImg itemImg' } alt={ 'si' } /> : <div className={ 'standarCardImg itemImg' }><Button onClick={ openEvent } className="button button-large" >Pick an image</Button></div>;

		const textChangedHandler = ( event, id ) => {
			const cardIndex = this.attributes.cards.findIndex( p => {
				return p.id === id;
			} );
			const card = { ...this.attributes.cards[ cardIndex ] };
			// const card = Object.assign({}, this.attributes.cards[cardIndex])
			card.name = event.target.value;
			const cards = [ ...this.attributes.cards ];
			cards[ cardIndex ] = card;
			this.setAttributes( { cards: cards } );
		};
		const imgChangedHandler = ( event, id ) => { console.log( attributes.cards );
			console.log( 'a' );
			const cardIndex = attributes.cards.findIndex( p => {
				return p.id === id;
			} );
			console.log( 'b' );
			const card = { ...attributes.cards[ cardIndex ] };
			console.log( 'c' );
			// const card = Object.assign({}, this.attributes.cards[cardIndex])
			card.url = event.url;
			card.alt = event.alt;
			console.log( 'd' );
			const cards = [ ...attributes.cards ];
			console.log( cards );
			console.log( 'e' );
			cards[ cardIndex ] = card;
			console.log( cards );
			console.log( 'f' );
			setAttributes( { cards: cards } );
			console.log( 'g' );
			console.log( attributes.cards );
		};

		const cards = (
			<div>
				{ attributes.cards.map( ( card ) => {
					return <TestEdit
						url={ card.url }
						alt={ card.alt }
						txt={ card.txt }
						key={ card.id }
						// select={ media => { setAttributes( { card.url: media.url, card.alt: media.alt } ); } }
						select={ ( event )=>imgChangedHandler( event, card.id ) }
						render={ ( { open } ) => getLogoButton( open ) }
						changed={ ( event )=>textChangedHandler( event, card.id ) }
					></TestEdit>;
				} ) }
			</div>
		);

		return (
			<section className="ATF">
				{ cards }
				<MediaUpload
					onSelect={ media => {
						setAttributes( { videoUrl: media.url } );
					} }
					value={ attributes.imageID }
					render={ ( { open } ) => getVideoButton( open ) }
				/>

				<figure className="ATFIsoLogo">
					<MediaUpload
						onSelect={ media => {
							setAttributes( { logoUrl: media.url, logoAlt: media.alt } );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getLogoButton( open ) }
					/>
					<figcaption className="ATFtitle specialTitle">
						<h2 className="copyATF">
							<RichText
								onChange={ content => setAttributes( { copyATF: content } ) }
								value={ attributes.copyATF }
								placeholder="The copy of the site"
							/>
						</h2>
					</figcaption>
				</figure>

				<figure className="cards cardsATF cardATF1">
					<MediaUpload
						onSelect={ media => {
							setAttributes( { card1Url: media.url, card1Alt: media.alt } );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getcad1ImgButton( open ) }
					/>
					<figcaption className="cardsTxt specialTitle">
						<h3 className="card1Text">
							<RichText
								onChange={ content => setAttributes( { card1Text: content } ) }
								value={ attributes.card1Text }
								placeholder="Your card text"
							/>
						</h3>
					</figcaption>
				</figure>
				<figure className="cards cardsATF cardATF2">
					<MediaUpload
						onSelect={ media => {
							setAttributes( { card2Url: media.url, card2Alt: media.alt } );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getcad2ImgButton( open ) }
					/>
					<figcaption className="cardsTxt specialTitle">
						<h3 className="card2Text">
							<RichText
								onChange={ content => setAttributes( { card2Text: content } ) }
								value={ attributes.card2Text }
								placeholder="Your card text"
							/>
						</h3>
					</figcaption>
				</figure>
				<figure className="cards cardsATF cardATF3">
					<MediaUpload
						onSelect={ media => {
							setAttributes( { card3Url: media.url, card3Alt: media.alt } );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getcad3ImgButton( open ) }
					/>
					<figcaption className="cardsTxt specialTitle">
						<h3 className="card3Text">
							<RichText
								onChange={ content => setAttributes( { card3Text: content } ) }
								value={ attributes.card3Text }
								placeholder="Your card text"
							/>
						</h3>
					</figcaption>
				</figure>
				{ /* <TestEdit abc={ 'hooooolaaaaa' } changed={ ( event )=>this.textChangedHandler( event, person.id ) }></TestEdit> */ }
			</section>
		);
	},
	save( { attributes } ) {
		const backgroundVideo = src => src ? <video className="videoATF" loop="loop" autoPlay={ 'true' } playsinline={ 'true' } muted={ 'true' }><source className={ 'videoATFSrc' } src={ src }></source></video> : null;
		const image = ( src, alt, className ) => src ? <img src={ src } className={ className } alt={ alt } /> : null;

		return (
			<section className="ATF">
				{ backgroundVideo( attributes.videoUrl ) }

				<figure className="ATFIsoLogo">
					{ image( attributes.logoUrl, attributes.logoAlt, 'ATFLogo itemImg' ) }
					<figcaption className="ATFtitle specialTitle">
						<h2 className="copyATF">{ attributes.copyATF }</h2>
					</figcaption>
				</figure>

				<figure className="cards cardsATF cardATF1">
					{ image( attributes.card1Url, attributes.card1Alt, 'standarCardImg itemImg' ) }
					<figcaption className="cardsTxt specialTitle">
						<h3 className="card1Text">{ attributes.card1Text }</h3>
					</figcaption>
				</figure>
				<figure className="cards cardsATF cardATF2">
					{ image( attributes.card2Url, attributes.card2Alt, 'standarCardImg itemImg' ) }
					<figcaption className="cardsTxt specialTitle">
						<h3 className="card2Text">{ attributes.card2Text }</h3>
					</figcaption>
				</figure>
				<figure className="cards cardsATF cardATF3">
					{ image( attributes.card3Url, attributes.card3Alt, 'standarCardImg itemImg' ) }
					<figcaption className="cardsTxt specialTitle">
						<h3 className="card3Text">{ attributes.card3Text }</h3>
					</figcaption>
				</figure>
			</section>
		);
	},
} );
