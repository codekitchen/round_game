package list

import "iter"

type List[T any] struct {
	root Node[T]
	len  int
}

type Node[T any] struct {
	Value      T
	list       *List[T]
	next, prev *Node[T]
}

// Len returns the number of elements in the list. O(1)
func (l *List[T]) Len() int {
	return l.len
}

// Init initializes the list, clearing it if it was already used.
func (l *List[T]) Init() *List[T] {
	l.len = 0
	l.root.next, l.root.prev = &l.root, &l.root
	l.root.list = l
	return l
}

// New returns an initialized list.
func New[T any]() *List[T] {
	return (&List[T]{}).Init()
}

// filterRoot returns nil if the node is root, otherwise the node
func (l *List[T]) filterRoot(n *Node[T]) *Node[T] {
	if n == &l.root {
		return nil
	}
	return n
}

// Front returns the first node in list l, or nil if l is empty
func (l *List[T]) Front() *Node[T] {
	return l.filterRoot(l.root.next)
}

// Back returns the last node in list l, or nil if l is empty
func (l *List[T]) Back() *Node[T] {
	return l.filterRoot(l.root.prev)
}

// InsertBefore inserts a new element e with value v immediately before mark and returns e.
// If mark is nil, InsertBefore inserts new element e with value v at the front of the list.
// If mark is not an element of l, the list is not modified.
func (l *List[T]) InsertBefore(v T, mark *Node[T]) *Node[T] {
	if mark == nil {
		mark = l.root.next
	}
	if mark.list != l {
		return nil
	}
	return l.insertValue(v, mark.prev)
}

// Remove removes n from l if n is a node in list l.
func (l *List[T]) Remove(n *Node[T]) {
	if l == nil || n == nil || n.list != l {
		return
	}
	// clear out references for GC
	n.next.prev = n.prev
	n.prev.next = n.next
	n.next, n.prev = nil, nil
	n.list = nil
	l.len--
}

// insert inserts a new element n after mark, increments len, and returns n.
// n must not be nil or already in l.
func (l *List[T]) insert(n, mark *Node[T]) *Node[T] {
	n.list = l
	n.prev = mark
	n.next = mark.next
	mark.next = n
	n.next.prev = n
	l.len++
	return n
}

// insertValue is a convenience wrapper for insert(&Node{Value: v}, mark).
func (l *List[T]) insertValue(v T, mark *Node[T]) *Node[T] {
	return l.insert(&Node[T]{Value: v}, mark)
}

// All iterates over all values in l
func (l *List[T]) All() iter.Seq[T] {
	return func(yield func(v T) bool) {
		for n := range l.AllNodes() {
			if !yield(n.Value) {
				return
			}
		}
	}
}

// AllNodes iterates over all nodes in l
func (l *List[T]) AllNodes() iter.Seq[*Node[T]] {
	return func(yield func(n *Node[T]) bool) {
		if l == nil {
			return
		}
		for cur := l.root.next; cur != &l.root; cur = cur.next {
			if !yield(cur) {
				return
			}
		}
	}
}

// Find passes each node value to cb, and returns the first node for which cb
// returns true
func (l *List[T]) Find(cb func(v T) bool) *Node[T] {
	for n := range l.AllNodes() {
		if cb(n.Value) {
			return n
		}
	}
	return nil
}

// Next returns the next node in the list, or nil
func (n *Node[T]) Next() *Node[T] {
	return n.list.filterRoot(n.next)
}

// Prev returns the previous node in the list, or nil
func (n *Node[T]) Prev() *Node[T] {
	return n.list.filterRoot(n.prev)
}

// NextOrFront returns the next node, wrapping around to front if next is nil
func (n *Node[T]) NextOrFront() *Node[T] {
	val := n.Next()
	if val == nil {
		val = n.list.Front()
	}
	return val
}
