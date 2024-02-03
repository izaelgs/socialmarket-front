import { defineStore } from 'pinia';

interface UserState {
  id: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
  birthAt: string | null;
  about: string;
  photo: string | null;
  cover_photo: string | null;
  comments: Boolean;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    id: null,
    username: null,
    email: null,
    about: '',
    photo: null,
    cover_photo: null,
    birthAt: null,
    comments: false,
    name: null, // Inicialize a propriedade 'name'
  }),
  getters: {
    isLoggedIn: (state) => state.id !== null,
  },
  actions: {
    setUser({
      id,
      username,
      email,
      about,
      photo,
      cover_photo,
      birthAt,
      comments,
      name, // Adicione 'name' aos parâmetros da ação setUser
    }: UserState) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.about = about;
      this.photo = photo;
      this.cover_photo = cover_photo;
      this.birthAt = birthAt;
      this.comments = comments || false;
      this.name = name; // Atualize a propriedade 'name'
      this.saveToLocalStorage();
    },
    clearUser() {
      this.id = null;
      this.username = null;
      this.email = null;
      this.about = '';
      this.photo = null;
      this.cover_photo = null;
      this.birthAt = null;
      this.comments = false;
      this.name = null; // Limpe a propriedade 'name' também
      this.removeFromLocalStorage();
    },
    loadFromLocalStorage() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        this.setUser(parsedUser);
      }
    },
    saveToLocalStorage() {
      const userState = {
        id: this.id,
        username: this.username,
        email: this.email,
        about: this.about,
        photo: this.photo,
        cover_photo: this.cover_photo,
        birthAt: this.birthAt,
        comments: this.comments,
        name: this.name, // Inclua 'name' nos dados a serem salvos
      };
      localStorage.setItem('user', JSON.stringify(userState));
    },
    removeFromLocalStorage() {
      localStorage.removeItem('user');
    },
  },
});
