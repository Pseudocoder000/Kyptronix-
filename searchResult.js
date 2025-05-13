import Link from "next/link"

export function createResult(searchJSON) {
    if (searchJSON) {
        return (
            <div className="searchList">
                {
                    searchJSON.map((result, index) => (
                        <p key={index}>
                            <Link href={`/users/profile/${result.name}`}>
                                {result.name}
                            </Link>
                        </p>
                    ))

                }
            </div>
        )
    }
}



