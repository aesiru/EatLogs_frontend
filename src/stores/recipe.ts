
import adoboImg from '@/assets/pictures/adobo.png'
import carbonaraImg from '@/assets/pictures/carbonara.png'
import bicolExpressImg from '@/assets/pictures/bicol-express.png'

export interface Ingredient {
  name: string
  unit: string
}

export interface Step {
  description: string
}

export interface Recipe {
  id: string
  recipe_name: string
  cuisine: string
  category: string
  duration: number 
  serving: number 
  description: string
  procedure: string
  image: string
  favorite: boolean
  ingredients: Ingredient[]
  steps: Step[]
  notes?: string
}
// export interface Recipe{
//     id: string
//     recipe_name: string
//     cuisine: string
//     category: string
//     duration: number
//     serving: number
//     description: string
//     procedure: string
//     image: string
//     favorite: boolean

// }

export const recipes: Recipe[] = [
    {
        id: "000001",
        recipe_name: "Chicken Adobo",
        cuisine: "Filipino",
        category: "Meat",
        duration: 60,
        serving: 4,
        description: "meow meow",
        procedure: "Step step step",
        image: adoboImg,
        favorite: false,
        ingredients: [],
        steps: [],
    },
    {
        id: "000002",
        recipe_name: "Carbonara",
        cuisine: "Italian",
        category: "Pasta",
        duration: 40,
        serving: 4,
        description: "meow meow",
        procedure: "Step step step",
        image: carbonaraImg,
        favorite: true,
        ingredients: [],
        steps: [],
    },
    {
        id: "000003",
        recipe_name: "Bicol Express",
        cuisine: "Filipino",
        category: "Meat",
        duration: 20,
        serving: 2,
        description: "meow meow",
        procedure: "Step step step",
        image: bicolExpressImg,
        favorite: true,
        ingredients: [],
        steps: [],
    },
]