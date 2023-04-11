import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, content, keywords }) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={content} />
                <meta name='keyword' content={keywords} />
            </Helmet>
        </div>
    )
}

Meta.defaultProps = {
    title: 'Welcome to ECART',
    description: 'we sell premium electronics in best price',
    keywords: 'electronics, cheap, best electronics, best price'
}

export default Meta