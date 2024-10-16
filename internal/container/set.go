package container

type Set[T comparable] map[T]struct{}

func (s Set[T]) Add(k T) {
	s[k] = struct{}{}
}

func (s Set[T]) Remove(k T) {
	delete(s, k)
}

func (s Set[T]) Contains(k T) bool {
	_, ok := s[k]
	return ok
}

// "First" is a poor name since iteration is unordered
func (s Set[T]) First() (T, bool) {
	for k := range s {
		return k, true
	}
	var empty T
	return empty, false
}
