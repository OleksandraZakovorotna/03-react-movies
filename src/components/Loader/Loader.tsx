import css from './Loader.module.css'

interface LoaderProps { 
    isLoading: boolean;
    hasError: boolean;
}

export default function Loader({isLoading, hasError}: LoaderProps) { 
    return (
        <div>
            {isLoading ?
                <p className={css.text}>Loading movies, please wait...</p> :
                hasError && <p className={css.text}>There was an error, please try again...</p>}
        </div>
    )
}
