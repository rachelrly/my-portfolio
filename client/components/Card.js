import Link from 'next/link'

export default function Card({children, title, links, date}){

    return (
        <article>
            <h3>{title}</h3>
            <span>{date}</span>
            {children}
            <Links links={links} />
        </article>
    )
}

function Links({links}){
    const linksJsx = links.map(({title, href}, index) => (
        <Link href={href} key={index}>
        <li>{title}</li>
        </Link>
        ))
    return (
        <ul>
            {linksJsx}
        </ul>
    )
}