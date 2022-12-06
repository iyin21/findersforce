import { BiSearch } from "react-icons/bi"

export interface ISearchProps {
    text: string
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({ text, handleSearch }: ISearchProps) => {
    return (
        <div>
            <form className="bg-black-5 px-3 py-2 flex items-center rounded-lg">
                <button type="button" className="btn__search">
                    <BiSearch color="#0F0D004D" size={25} />
                </button>
                <input
                    type="text"
                    placeholder={text}
                    onChange={(e) => {
                        handleSearch(e)
                    }}
                    className="outline-none bg-transparent p-1 text-md placeholder:text-3sm placeholder:text-black-30 placeholder:font-creato"
                    name="search"
                    id="search__bar"
                />
            </form>
        </div>
    )
}

export default SearchBar
