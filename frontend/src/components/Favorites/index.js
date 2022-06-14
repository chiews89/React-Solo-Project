import { useDispatch, useSelector } from "react-redux";

export const AllFavorites = ({spot}) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const favorites = Object.values(useSelector((state) => state.favorites))

    const filteredFavorite = favorites.filter((favorite) => {
        return favorite.spotId === spot.id
    })

    const userFavorited = filteredFavorite.filter((favorite) => {
        return favorite.userId === user.id
    })

    console.log('favorited', userFavorited)

    return (
        <div className="favorites-container">
            Favorited
        </div>
    )
}
