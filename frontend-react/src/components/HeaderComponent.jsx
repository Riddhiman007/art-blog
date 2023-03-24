import React from 'react'
import PropTypes from 'prop-types'


import background from "../static/img/ganesh.jpg";
function Header(props) {
    return (
        <header className='masthead' style={ { backgroundImage: props.bg_image } } >
            <div className='container relative mx-auto !px-6 lg:!px-12'>
                <div className='flex flex-wrap justify-center mt-0 mx-[calc(-.5_*_1.5rem)] lg:mx-[calc(-.5_*_3rem)]'>
                    <div className='flex-shrink-0 w-full max-w-full mt-0 mx-[calc(-.5_*_1.5rem)] md:mx-[calc(-.5_*_3rem)] md:[flex:_0_0_auto] md:[width:83.33333333%] lg:[flex:_0_0_auto] lg:w-[66.66666667%] xl:[flex:_0_0_auto] xl:w-[58.33333333%]'>
                        <div className={ `text-white ${props.className}` }>
                            <h1 className='[font-size:_3rem] lg:[font-size:5rem]'>{ props.heading }</h1>
                            { props.children }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    bg_image: PropTypes.string,
    heading: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,

}

Header.defaultProps = {
    bg_image: `url(${background})`,
    heading: 'Art Blog',
    className: 'text-center',
    // heading_type: 
}
export default Header;
